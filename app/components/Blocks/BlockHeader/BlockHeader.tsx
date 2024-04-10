type Props = {
    amount: string;
    num: number;
    title: string;
};

export const BlockHeader = ({ amount, num, title }: Props) => {
    return (
        <header className="flex flex-col font-bold gap-2">
            <h2 className="text-4xl">{title}</h2>
            <h3 className="text-2xl">
                <span>{amount}</span>
                <small>/ {num} Sales</small>
            </h3>
        </header>
    );
};
