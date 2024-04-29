type Props = {
    children: string;
};

export const Title = ({ children }: Props) => <h2 className="text-4xl font-bold">{children}</h2>;
