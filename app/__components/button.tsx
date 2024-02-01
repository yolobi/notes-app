export default function Button({
    text,
    handler,
    color = "bg-indigo-600",
}: {
    text: string;
    handler?: () => void;
    color?: string;
}) {
    return (
        <>
            <button
                onClick={handler}
                type="button"
                className={`rounded-md ${color} px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm w-full hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
                {text}
            </button>
        </>
    );
}
