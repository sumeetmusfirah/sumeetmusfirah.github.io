import Edges from "@/components/Edges";

export default function Footer() {
  return (
    <footer className="footer">
      <Edges />
      <p>© {new Date().getFullYear()} Sumeet Musfirah</p>
      <p className="whisper">psst: the home page has a cup of chai hidden in it.</p>
    </footer>
  );
}
