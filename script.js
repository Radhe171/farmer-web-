/* =========================================
   HELPER
========================================= */

const $ = selector => {
    return document.querySelector(selector);
};


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    const nav = $("#navLinks");

    nav.classList.toggle("open");
}


/* =========================================
   SCROLL TO PRICE
========================================= */

function scrollToPrices() {

    const prices = document.querySelector("#prices");

    prices.scrollIntoView({
        behavior: "smooth"
    });

    toast("Showing today's mandi prices");
}


/* =========================================
   TOAST MESSAGE
========================================= */

function toast(message) {

    const toastBox = $("#toast");

    toastBox.textContent = message;

    toastBox.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toastBox.classList.remove("show");

    }, 2600);
}


/* =========================================
   MODAL OPEN
========================================= */

function openModal(id) {

    const modal = document.getElementById(id);

    modal.classList.add("show");
}


/* =========================================
   MODAL CLOSE
========================================= */

function closeModal(id) {

    const modal = document.getElementById(id);

    modal.classList.remove("show");
}


/* =========================================
   LOGIN
========================================= */

function loginDemo() {

    toast("Demo login successful!");

    closeModal("loginModal");
}


/* =========================================
   REFRESH PRICES
========================================= */

function refreshPrices() {

    toast(
        "Mandi prices refreshed • Demo data updated"
    );
}


/* =========================================
   FILTER PRICES
========================================= */

function filterPrices() {

    const input =
        document.querySelector("#cropFilter");

    const query =
        input.value.toLowerCase().trim();


    const rows =
        document.querySelectorAll(
            "#priceTable tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        if (
            !query ||
            text.includes(query)
        ) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });


    if (query) {

        toast(
            `Showing results for "${query}"`
        );

    } else {

        toast("All prices displayed");

    }
}


/* =========================================
   RESET FILTER
========================================= */

function resetFilter() {

    const input =
        document.querySelector("#cropFilter");

    input.value = "";


    const rows =
        document.querySelectorAll(
            "#priceTable tbody tr"
        );


    rows.forEach(row => {

        row.style.display = "";

    });


    toast("Filters reset");
}


/* =========================================
   MANDI INFORMATION
========================================= */

function showMandi(state) {


    const mandiData = {

        "Madhya Pradesh": [
            "Jabalpur Mandi",
            "Soybean",
            "₹4,680/q",
            "1,240 q",
            "48"
        ],

        "Maharashtra": [
            "Nagpur Mandi",
            "Maize",
            "₹2,120/q",
            "2,540 q",
            "63"
        ],

        "Rajasthan": [
            "Kota Mandi",
            "Mustard",
            "₹5,430/q",
            "980 q",
            "36"
        ],

        "Uttar Pradesh": [
            "Agra Mandi",
            "Potato",
            "₹1,480/q",
            "2,210 q",
            "52"
        ],

        "Punjab": [
            "Ludhiana Mandi",
            "Wheat",
            "₹2,410/q",
            "1,860 q",
            "41"
        ],

        "Gujarat": [
            "Rajkot Mandi",
            "Groundnut",
            "₹5,720/q",
            "1,110 q",
            "39"
        ]

    };


    const data =
        mandiData[state] ||
        mandiData["Madhya Pradesh"];


    const mandiInfo =
        document.querySelector("#mandiInfo");


    mandiInfo.innerHTML = `

        <div class="info-icon">
            📍
        </div>


        <div>

            <span>
                SELECTED MANDI
            </span>

            <h3>
                ${data[0]}
            </h3>

            <p>
                ${state}
            </p>

        </div>


        <div class="info-grid">


            <div>

                <small>
                    Top Crop
                </small>

                <b>
                    ${data[1]}
                </b>

            </div>


            <div>

                <small>
                    Modal Price
                </small>

                <b>
                    ${data[2]}
                </b>

            </div>


            <div>

                <small>
                    Today's Arrival
                </small>

                <b>
                    ${data[3]}
                </b>

            </div>


            <div>

                <small>
                    Active Buyers
                </small>

                <b>
                    ${data[4]}
                </b>

            </div>


        </div>


        <button
            class="outline full"
            onclick="openMandiDetails()">

            View Mandi Details →

        </button>

    `;

}


/* =========================================
   MANDI DETAILS
========================================= */

function openMandiDetails() {

    openCrop("Jabalpur Mandi");
}


/* =========================================
   CROP DETAILS
========================================= */

function openCrop(name) {


    const data = {

        Wheat: [
            "🌾",
            "Wheat / गेहूं",
            "₹2,450/q",
            "Indore Mandi",
            "+4.8%"
        ],

        Soybean: [
            "🫘",
            "Soybean / सोयाबीन",
            "₹4,680/q",
            "Jabalpur Mandi",
            "+2.1%"
        ],

        Maize: [
            "🌽",
            "Maize / मक्का",
            "₹2,120/q",
            "Nagpur Mandi",
            "-1.4%"
        ],

        Mustard: [
            "🌱",
            "Mustard / सरसों",
            "₹5,430/q",
            "Kota Mandi",
            "+3.6%"
        ],

        "Jabalpur Mandi": [
            "📍",
            "Jabalpur Mandi",
            "₹4,680/q",
            "Jabalpur, MP",
            "48 active buyers"
        ]

    };


    const crop =
        data[name] ||
        data.Wheat;


    const detail =
        document.querySelector("#detailContent");


    detail.innerHTML = `

        <div class="modal-icon">
            ${crop[0]}
        </div>


        <div class="eyebrow">
            DETAIL VIEW
        </div>


        <h2>
            ${crop[1]}
        </h2>


        <p>
            Current modal price:
            <b>${crop[2]}</b>
        </p>


        <p>
            Best market:
            <b>${crop[3]}</b>
        </p>


        <p>
            Today:
            <span class="${
                crop[4].startsWith("+")
                    ? "up"
                    : "down"
            }">

                ${crop[4]}

            </span>
        </p>


        <button
            class="primary full"
            onclick="
                closeModal('detailModal');
                scrollToPrices();
            ">

            Compare Mandi Prices →

        </button>

    `;


    openModal("detailModal");
}


/* =========================================
   CHART RANGE
========================================= */

function setRange(button, range) {


    const buttons =
        document.querySelectorAll(
            ".range-tabs button"
        );


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    toast(
        `Price chart switched to ${range}`
    );
}


/* =========================================
   CHART CROP
========================================= */

function drawChart() {

    const crop =
        document.querySelector("#chartCrop")
            .value;


    toast(
        "Showing " +
        crop +
        " price trend"
    );
}


/* =========================================
   SELL CROP
========================================= */

function listCrop(event) {

    event.preventDefault();


    event.target.reset();


    toast(
        "🌾 Your crop has been listed for buyers!"
    );
}


/* =========================================
   PRICE ALERT
========================================= */

function setAlert(event) {

    event.preventDefault();


    toast(
        "🔔 Price alert successfully set!"
    );
}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList
                .contains("modal")
        ) {

            event.target
                .classList
                .remove("show");

        }

    }
);


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelector("#navLinks")
                    .classList
                    .remove("open");

            }
        );

    });