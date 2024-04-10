type Props = {
    children: string;
};

export const Title = ({ children }: Props) => {
    return <h2 className="text-4xl font-bold">{children}</h2>;
};
