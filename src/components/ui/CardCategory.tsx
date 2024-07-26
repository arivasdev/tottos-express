import { Link } from "react-router-dom";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-bold mb-2">{children}</h2>;
};

const Icon = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-4xl text-blue-500 mb-4">{children}</div>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-600">{children}</p>;
};

const CardCategory = ({ children, redirectTo }: { children: React.ReactNode, redirectTo: string }) => {
    return (
        <Link to={redirectTo}>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center h-full">
                {children}
            </div>
        </Link>
    )
}

CardCategory.Title = Title;
CardCategory.Icon = Icon;
CardCategory.Description = Description;

export default CardCategory;