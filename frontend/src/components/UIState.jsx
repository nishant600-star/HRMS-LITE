export function Loading() {
    return <p style={{ color: "#555" }}>Loading...</p>;
}

export function Empty({ message }) {
    return <p style={{ color: "#777" }}>{message}</p>;
}

export function ErrorMessage({ message }) {
    return <p style={{ color: "red" }}>{message}</p>;
}
