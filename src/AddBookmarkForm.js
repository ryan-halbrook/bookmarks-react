export default function AddBookmarkForm() {
    return (
        <form>
            <div className="TextField">
                <label for="name">Name: </label>
                <input type="text" name="name" required/>
            </div>
            <div className="TextField">
                <label for="link">Link: </label>
                <input type="text" name="link" required/>
            </div>
            <div className="TextField">
                <label for="topic">Topic: </label>
                <input type="text" name="topic" required/>
            </div>
            <div className="TextField">
                <label for="description">Description: </label>
                <input type="text" name="description"/>
            </div>
            <input type="submit"/>
        </form>
    );
}
