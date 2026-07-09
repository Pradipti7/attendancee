export default function DisplayDate() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-8 pt-6">
      <p className="text-sm text-gray-500">{today}</p>
    </div>
  );
}
