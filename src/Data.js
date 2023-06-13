import { v4 as uuidv4 } from 'uuid';

function chillHop() {
    return [
        {
            name: "Hidden Structure",
            cover: "https://chillhop.com/wp-content/uploads/2020/09/88e7eb711f8c71d87fc102e97cf91e36f692348d-1024x1024.jpg",
            artist: "Leavv, Flitz&Suppe",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=9913",
            color: ["#86AD6F", "#4F8F96"],
            id: uuidv4(),
            active: true,
        },
        {
            name: "Maple Leaf Pt. 2",
            cover: "https://chillhop.com/wp-content/uploads/2020/09/2899f7cc22ab12e17d0119819aac3ca9dbab46e6-1024x1024.jpg",            
            artist: "Philanthrope",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=10243",
            color: ["#cf5846", "#363b24"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Slim Bobby",
            cover: "https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg",            
            artist: "Aviino",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=10448",
            color: ["#c261ae", "#4f8ace"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Not a Cloud in Sight",
            cover: "https://chillhop.com/wp-content/uploads/2020/10/23fdd99adc3e16abcb67b004ea3e748ebf433a49-1024x1024.jpg",            
            artist: "Aviino",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=10450",
            color: ["#c261ae", "#4f8ace"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Envision",
            cover: "https://chillhop.com/wp-content/uploads/2020/10/efaa848553d09b4d9fc0752844456e41b34de276-1024x1024.jpg",            
            artist: "Philanthrope, Fujitsu",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=9083",
            color: ["#684a93", "#7cd1f6"],
            id: uuidv4(),
            active: false,
        },
        {
            name: "Pueblo",
            cover: "https://chillhop.com/wp-content/uploads/2020/10/efaa848553d09b4d9fc0752844456e41b34de276-1024x1024.jpg",            
            artist: "Philanthrope, Tusken",
            audio: "https://mp3.chillhop.com/serve.php/?mp3=9084",
            color: ["#684a93", "#7cd1f6"],
            id: uuidv4(),
            active: false,
        },
    ]
}

export default chillHop;