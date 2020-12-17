window.PrintCountData = class PrintCountData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            title: props.title,
            loading: false,
        };
    }

    componentDidMount() {

    }

    print = () => {
        this.setState({
            loading: true,
        });
        let hide = antd.message.info('正在打印总单, 请稍后', 0);
        new Promise((resolve, reject) => {
            printCountData(document.getElementsByClassName('printTable')[0].outerHTML, resolve, reject);
        }).then((e) => {
            hide();
            antd.message.success('总单打印成功!', 2);
            this.setState({
                loading: false,
            });
        }).catch((e) => {
            hide();
            antd.Modal.error({
                title: '出错了',
                content: `总单打印失败!, 错误信息: ${e}`,
            });
            this.setState({
                loading: false,
            });
        })
    }

    render() {
        let count = 0;
        return (
            <div className="printTable" style={{width: '100%', fontWeight: 600}}>
                <table border={1} width="100%" cellSpacing={20}>
                    <tbody>
                    <tr align="center" style={{fontSize: '24px'}}>
                        <th colSpan={2}>{this.state.title}</th>
                    </tr>
                    <tr align="center" style={{fontSize: '18px'}}>
                        <th>餐品名称</th>
                        <th>餐品数量</th>
                    </tr>
                    {
                        this.state.data.map((item, key) => {
                            count += item.number;
                            return <tr key={key} align="center" style={{fontSize: '16px'}}>
                                <td>{item.name}</td>
                                <td>{item.number} 份</td>
                            </tr>;
                        })
                    }
                    <tr align="center">
                        <td colSpan={2}>总计: {count} 份</td>
                    </tr>
                    </tbody>
                </table>
                <div className="printBtn">
                    <antd.Button type="primary" block onClick={this.print} loading={this.state.loading}>
                        立即打印
                    </antd.Button>
                </div>
            </div>
        );
    }
}