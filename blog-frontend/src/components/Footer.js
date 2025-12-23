export default function Footer() {
  return (
    <footer style={styles.footer}>
      © 2025 – Blog API Django & React
    </footer>
  );
}

const styles = {
  footer: {
    width: "100%",
    height: "50px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    color: "#334155",
  },
};

