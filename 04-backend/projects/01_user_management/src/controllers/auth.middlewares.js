

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {

    } catch (error) {
        throw new Error("Internal server error: ", error)
    }
}