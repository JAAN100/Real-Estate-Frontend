import {useRef , useState , useEffect} from 'react'
export default function Contact({ listing, ref: contactRef }) {
    const [message, setMessage] = useState('');
    const [landlord, setLandlord] = useState(listing.userRef);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchLandlordData = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`, {
                    method: "GET"
                });
                const data = await response.json();                
                if (data.success === false) {
                    setError("Failed to fetch landlord data: " + data.message);
                    return;
                }
                setLandlord(data);
            } catch (error) {
                setError("Error fetching landlord data: " + error.message);
            }
        };
        fetchLandlordData();
    }, [])
    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            window.location.href = `mailto:${landlord.email}?
                                    Subject=Regarding ${listing.name}
                                    &body=${message}`;
        } catch (error) {
            setError("Error sending email: " + error.message);
        }
    };
    return (
        <div className='my-6'>
            {landlord && (
                <div>
                    <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea rows={2} onChange={(e) => setMessage(e.target.value)} value={message} className='w-full rounded-lg p-3 my-3' placeholder='Enter your message here...'></textarea>
                    <button ref={contactRef} className='w-full uppercase mt-2 p-2 bg-slate-900 rounded-md text-white' onClick={(e) => {sendEmail(e)}}>Send Message</button>
                    {error && <p className='text-red-500 mt-2'>{error}</p>}
                </div>
            )}
        </div>
    )
}       
