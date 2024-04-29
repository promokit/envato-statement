type Props = {
    children: JSX.Element;
};

export const BlockSkeleton = ({ children }: Props) => (
    <section className="flex flex-col gap-8">{children}</section>
);
