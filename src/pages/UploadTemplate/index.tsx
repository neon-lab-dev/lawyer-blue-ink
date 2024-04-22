import Button from "@/components/reusable/Button";

const Home = () => {
  return (
    <div className="flex gap-4">
      <Button>Click me</Button>
      <Button variant="secondary">Click me</Button>
      <Button variant="outline">Click me</Button>
    </div>
  );
};
export default Home;
