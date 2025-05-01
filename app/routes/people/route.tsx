import Navbar from "~/components/navbar";
import peopleBackground from "../../../public/people.png"

export default function People() {
    return (
        <div className="w-full h-full overflow-hidden">
            <Navbar />
            <img src={peopleBackground} alt="People" className="w-full h-auto object-cover max-w-none" />
            <div>
                <div>
                    <p>Staff</p>
                </div>
                <div>
                    <p>Student Leadership</p>
                </div>
                <div>
                    <p>Student Members</p>
                </div>
            </div>
        </div>
    )
}