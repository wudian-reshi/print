window.PrintTags = class PrintTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            title: props.title,
        };
    }

    componentDidMount() {

    }

    print = () => {
        console.log(document.getElementsByClassName('printTable'));
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}