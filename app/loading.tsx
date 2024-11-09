import { LoaderCircle } from "lucide-react"

export default function LoadingComponent() {
    return (
        <div className="flex justify-center items-center h-full">
            <LoaderCircle className="animate-spin h-10 w-10" />
        </div>
    )
}