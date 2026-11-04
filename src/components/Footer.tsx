import Edges from "@/components/Edges";

export default function Footer() {
  return (
    <footer className="footer">
      <Edges />
      <p>© {new Date().getFullYear()} Sumeet Musfirah</p>
    </footer>
  );
}
