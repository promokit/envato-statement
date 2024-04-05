import './styles.css';
type Props = {
    children: string
}

const Title = ({children}: Props) => {
    return <h2>{children}</h2>;
};

export default Title;
