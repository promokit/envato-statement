type ComponentType = {
    children: JSX.Element;
};

export const BlockSkeleton = ({ children }: ComponentType) => {
    return <section className="flex flex-col gap-8">{children}</section>;
};
