window.Table = class table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent: props.parent,
            loading: true,
            date: props.date,
            fullDate: props.fullDate,
            buttonSize: 'small',
            dataSource: [],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '柜机编号',
                    dataIndex: 'code',
                    key: 'code',
                },
                {
                    title: '地址',
                    dataIndex: 'address',
                    key: 'address',

                },
                {
                    title: '柜门数量',
                    dataIndex: 'lattice_count',
                    key: 'lattice_count',
                    className: 'hidden-column',
                },
                {
                    title: '操作',
                    key: 'action',
                    responsive: ['lg'],
                    width: 300,
                    render: (text, record) => (
                        <div className={'action'}>
                            <antd.Button
                                type="primary"
                                size={this.state.buttonSize}
                                onClick={(e) => {
                                    this.deviceLatticeDetail(record)
                                }}>柜门详情
                            </antd.Button>
                            <antd.Button
                                type="danger"
                                loading={record.tagLoading}
                                size={this.state.buttonSize}
                                onClick={(e) => {
                                    this.onPrintTags(record)
                                }}>打印标签
                            </antd.Button>
                            <antd.Button
                                loading={record.loading}
                                size={this.state.buttonSize}
                                onClick={(e) => {
                                    this.onPrintCountData(record)
                                }}>打印总单
                            </antd.Button>
                        </div>
                    ),
                }
            ],
        };
    }

    componentDidMount() {
        this.getDeviceList();
    }

    getDeviceList() {
        fetch(`http://192.168.1.176:81/api/devices?date=${this.state.date}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取柜机列表失败, 错误信息: ${res.message}`,
                    });
                    return;
                }

                this.setTableData(res.data);

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取柜机列表失败, 错误信息: ${e}`,
                });
            })
    }

    setTableData(data) {
        let source = data.map((value, index) => {
            return {
                key: index,
                id: value.id,
                code: value.code,
                address: value.address,
                lattice_count: value.lattice_count,
                loading: false,
                tagLoading: false,
            }
        });
        this.setState({
            dataSource: source,
            loading: false,
        })
    }

    deviceLatticeDetail(device) {
        this.state.parent.openDeviceLattice(
            this.state.date,
            device.id,
            device.lattice_count,
            `${this.state.fullDate} ${device.code}(${device.address})`
        );
    }

    onPrintCountData(device) {
        let copyData = this.state.dataSource;
        copyData[device.key].loading = true;
        this.setState({
            printCountDataloading: true,
            dataSource: copyData,
        })

        fetch(`http://192.168.1.176:81/api/batches?date=${this.state.date}&device_id=${device.id}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取总单数据失败, 错误信息: ${res.message}`,
                    });
                    return;
                }

                copyData[device.key].loading = false;
                this.setState({
                    dataSource: copyData
                })

                this.state.parent.openPrintCountData(this.state.date, res.data, device.code);

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取总单数据失败, 错误信息: ${e}`,
                });
                copyData[device.key].loading = false;
                this.setState({
                    dataSource: copyData
                })
            })
    }

    onPrintTags(device) {
        this.getBatches(device);
    }

    getBatches(device) {
        let copyData = this.state.dataSource;
        copyData[device.key].tagLoading = true;
        this.setState({
            printCountDataloading: true,
            dataSource: copyData,
        })

        fetch(`http://192.168.1.176:81/api/batches?date=${this.state.date}&device_id=${device.id}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取标签数据失败, 错误信息: ${res.message}`,
                    });
                    return;
                }

                this.getTagsData(device, res.data[0].id)

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取标签数据失败, 错误信息: ${e}`,
                });
                copyData[device.key].tagLoading = false;
                this.setState({
                    dataSource: copyData
                })
            })
    }

    getTagsData(device, batchId) {
        let copyData = this.state.dataSource;
        copyData[device.key].tagLoading = true;
        this.setState({
            printCountDataloading: true,
            dataSource: copyData,
        })
        fetch(`http://192.168.1.176:81/api/presets?batch_id=${batchId}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取标签数据失败, 错误信息: ${res.message}`,
                    });
                    return;
                }

                let hide = antd.message.info('正在打印标签, 请稍后', 0);
                new Promise((resolve, reject) => {
                    printTags(this.pushQrcode(res.data), resolve, reject);
                }).then((e) => {
                    hide();
                    antd.message.success('标签打印成功!', 2);
                    copyData[device.key].tagLoading = false;
                    this.setState({
                        dataSource: copyData
                    })
                }).catch((e) => {
                    hide();
                    antd.Modal.error({
                        title: '出错了',
                        content: `标签打印失败!, 错误信息: ${e}`,
                    });
                    copyData[device.key].tagLoading = false;
                    this.setState({
                        dataSource: copyData
                    })
                })

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取标签数据失败, 错误信息: ${e}`,
                });
                copyData[device.key].tagLoading = false;
                this.setState({
                    dataSource: copyData
                })
            })
    }

    pushQrcode(data) {
        let len = data.length;
        for (let i = 0; i < len; i++) {
            data[i]['img'] = jrQrcode.getQrBase64(data[i].id);
        }

        return data;
    }
    render() {
        return (
            <antd.Table dataSource={this.state.dataSource} columns={this.state.columns} loading={this.state.loading}/>
        );
    }
}