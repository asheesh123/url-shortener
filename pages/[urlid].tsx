import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    let urlId = router.query.urlid;
    useEffect(() => {
        if (urlId)
            fetch(`/api/url-shortener/get/${urlId}`).then((response) => response.json()).then((data) => {
                router.replace(data?.shortUrl?.full)
            })
    }, [urlId])

    return null
}