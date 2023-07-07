type paramType = {
    id: number | string
}
export default function Profile({ params }: any) {
    return (
        <div>Welcome to the profile {params.id}</div>
    )
}