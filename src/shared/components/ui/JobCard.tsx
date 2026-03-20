export const JobCard = ({
  title,
  location,
  salary,
}: {
  title: string;
  location: string;
  salary: string;
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 cursor-pointer p-5 hover:shadow transition">
      <h3 className="font-semibold mb-1">{title}</h3>

      <p className="text-sm text-gray-500 mb-2">{location}</p>

      <div className="flex flex-wrap gap-2 text-xs mb-3">
        <span className="px-2 py-1 bg-gray-100 rounded">React</span>
        <span className="px-2 py-1 bg-gray-100 rounded">Node.js</span>
      </div>

      <p className="text-sm font-medium">{salary}</p>
    </div>
  );
};
