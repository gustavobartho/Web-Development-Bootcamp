exports.getDate = () => {

    const today = new Date().getDay();
    let dayText = "";

    const dateText = new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" });

    switch (today) {
        case 0:
            dayText = "Sunday you wonderful human being"
            break;
        case 1:
            dayText = "Monday you ignorant slut"
            break;
        case 2:
            dayText = "Tuesday you sexual predator";
            break;
        case 3:
            dayText = "Wednesday you inbred piece of shit";
            break;
        case 4:
            dayText = "Thursday Mrs. Failure";
            break;
        case 5:
            dayText = "Friday you ugly whore";
            break;
        case 6:
            dayText = "Saturday you hentai enthusiast";
            break;
    }

    return { dayText, dateText };
};