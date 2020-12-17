window.Lattice = class lattice extends React.Component {

    constructor(props) {
        super(props);

        let latticeInfo = [];
        for (let i = 1; i <= props.latticeNum; i++) {
            latticeInfo.push({
                num: i,
                goods: [],
                presetId: 0
            });
        }

        this.state = {
            date: props.date,
            deviceId: props.deviceId,
            latticeNum: props.latticeNum,
            latticeInfo: latticeInfo,
            loading: true,
        }

        this.getBatches();
    }

    getBatches() {
        console.log('获取批次')
        console.log(this.state)
        fetch(`http://192.168.1.176:81/api/batches?date=${this.state.date}&device_id=${this.state.deviceId}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取柜门信息失败, 错误信息: ${res.message}`,
                    });
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                if (res.data.length > 0) {
                    this.getPresets(res.data[0].id);
                }

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取柜门信息失败, 错误信息: ${e}`,
                });
                this.setState({
                    loading: false,
                })
            });
    }

    getPresets(batchId) {
        fetch(`http://192.168.1.176:81/api/presets?batch_id=${batchId}`)
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                if (res.code < 0) {
                    antd.Modal.error({
                        title: '出错了',
                        content: `获取柜门信息失败, 错误信息: ${res.message}`,
                    });
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                this.setLattices(res.data);

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取柜门信息失败, 错误信息: ${e}`,
                });
                this.setState({
                    loading: false,
                })
            });
    }

    setLattices(data) {
        console.log('set', data)
        const latticeInfo = this.state.latticeInfo;
        for (const key in latticeInfo) {
            for (const dataKey in data) {
                if (latticeInfo[key].num == data[dataKey].latticeNum) {
                    latticeInfo[key].presetId = data[dataKey].id;
                }
            }
        }
        this.setState({
            latticeInfo: latticeInfo,
            loading: false,
        })

        console.log(this.state.latticeInfo)
    }

    render() {
        return (
            <antd.Spin tip='正在加载柜门信息' spinning={this.state.loading}>
                <div className={'lattices'}>
                    {
                        this.state.latticeInfo.map((item, key) => {
                            if (item.presetId === 0) {
                                return <div className={'lattice empty'} key={key}>{item.num}</div>;
                            }

                            return <div className={'lattice user-reserve'} key={key}>{item.num}(预约)</div>;
                        })
                    }
                </div>
            </antd.Spin>
        );
    }
}