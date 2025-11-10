export default function TemplateLoader() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/templates/header.html")
    fetch("/templates/footer.html")
      .then(res => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}