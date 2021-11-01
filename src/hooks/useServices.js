import { useEffect, useState } from "react";

const useServices = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://secret-plains-62892.herokuapp.com/package')
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    return { services, setServices };
}

export default useServices;