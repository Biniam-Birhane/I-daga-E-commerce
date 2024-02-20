let UUID = 0;

export default function uniqueID() {
    const getID = () => {
        UUID++
        return UUID
    }

    return {
        getID
    }
}