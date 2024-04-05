import Title from "../../atoms/Title/Title";

type ComponentType = {
    title: string,
    children: JSX.Element
}
export const BlockSkeleton = ({title, children}: ComponentType) => {
    return <section>
        <Title>{title}</Title>
        <div>{children}</div>
    </section>;
}