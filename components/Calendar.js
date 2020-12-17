window.Calendar = class calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parent: props.parent,
            date: null,
            visible: false,
            title: '',
            date2: null,
            loading: false
        }
    }

    onDateFullCellRender = (val) => {
        let now = moment().format('YYYYMMDD'), date = val.format('YYYYMMDD');
        let className = '', des = '';

        if (date == now) {
            className = 'today bold';
            des = '(今天)';
        }

        if (date < now) {
            className = 'before';
        }

        if (date - now == 1) {
            className = 'bold';
            des = '(明天)';
        }

        if (date - now == 2) {
            className = 'bold';
            des = '(后天)';
        }

        return (
            <div className={'calendar-cell ' + className}>
                <p>{val.format('YYYY年MM月DD日')}</p>
                <p>{des}</p>
            </div>
        );
    }

    onSelect = (val) => {
        let date = val.format('YYYY年MM月DD日');
        let date2 = val.format('YYYY-MM-DD')
        this.setState({
            visible: true,
            title: date,
            date: date,
            date2: date2
        })
    }

    onModalCancel = (e) => {
        this.setState({
            visible: false,
        })
    }

    onPrintAllClick = (e) => {
        this.setState({
            loading: true,
        })

        fetch(`http://192.168.1.176:81/api/goods?date=${this.state.date2}`)
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
                this.setState({
                    loading: false,
                })

                this.state.parent.openPrintCountData(this.state.date, res.data);

            })
            .catch(e => {
                antd.Modal.error({
                    title: '出错了',
                    content: `获取总单数据失败, 错误信息: ${e}`,
                });
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        return (
            <div>
                <antd.Calendar
                    dateFullCellRender={this.onDateFullCellRender}
                    fullscreen={true}
                    onSelect={this.onSelect}
                />
                <antd.Modal
                    width="90%"
                    footer={null}
                    title={[
                        <div className={'modal-title'} key={Math.random()*10}>
                            <div className={'title'}>
                                {this.state.date}
                            </div>
                            <antd.Button loading={this.state.loading} onClick={this.onPrintAllClick}>打印全部柜机总单</antd.Button>
                        </div>
                    ]}
                    visible={this.state.visible}
                    onCancel={this.onModalCancel}
                >
                    { this.state.visible ? <Table parent={this.state.parent} fullDate={this.state.date} date={this.state.date2}></Table> : '' }
                </antd.Modal>
            </div>
        );
    }
}