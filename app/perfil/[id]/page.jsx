"use client";

import SpinnerFeed from "@components/SpinnerFeed";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const [loading, setLoading] = useState(false);
    const [userPublications, setUserPublications] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        setLoading(true);
            const response = await fetch(`/api/usuarios/${params?.id}/posts`);
            const data = await response.json();
            setLoading(false);
            setUserPublications(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <>
            <Profile
            name={userName}
            description={`Bienvenido al perfil de ${userName}, aquí puede leer todas sus publicaciones.`}
            data={userPublications}
            />
            {loading && <SpinnerFeed />}
        </>
    );
};

export default UserProfile;