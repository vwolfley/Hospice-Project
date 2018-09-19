/* ========================================================================
 * Maricopa Association of Governments
 * JS document
 * @project     MAG Schools Data Visualization Project
 * @summary     config file for project
 * @file        config.js
 * ======================================================================== */

define([], function() {
    return {

        startYear: "2017",

        version: "0.0.9 | 2018-08-23",
        copyright: "2018",

        emailLink: "https://www.azmag.gov/EmailPages/JasonHoward.asp",

        // mainURL: "http://geo.azmag.gov/gismag/rest/services/maps/ReadOn_test/MapServer/0",
        // mainURL: "http://geo.azmag.gov/gismag/rest/services/Test/SchoolsTestData/MapServer",
        mainURL: "http://geo.azmag.gov/gismag/rest/services/Test/SchoolsData_2018/MapServer",

        schoolsMarkers: {
            type: "unique-value",
            field: "SchoolType",
            uniqueValueInfos: [{
                value: "Elementary",
                symbol: {
                    type: "picture-marker",
                    url: "./app/images/mapIcons/blue.png",
                    width: "18px",
                    height: "18px",
                    // type: "text",
                    // text: "esri-icon-map-pin",
                    // color: "#0663b8",
                    // font: {
                    //     size: 18,
                    //     family: "CalciteWebCoreIcons"
                    // }
                }
            }, {
                value: "Middle",
                symbol: {
                    type: "picture-marker",
                    url: "./app/images/mapIcons/teal.png",
                    width: "18px",
                    height: "18px",
                    // type: "text",
                    // text: "\ue61d",
                    // color: "#63b806",
                    // font: {
                    //     size: 18,
                    //     family: "CalciteWebCoreIcons"
                    // }
                }
            }, {
                value: "High School",
                symbol: {
                    type: "picture-marker",
                    url: "./app/images/mapIcons/purple.png",
                    width: "18px",
                    height: "18px",
                    // type: "text",
                    // text: "\ue61d",
                    // color: "#b80663",
                    // font: {
                    //     size: 18,
                    //     family: "CalciteWebCoreIcons"
                    // }
                }
            }],
            defaultSymbol: {
                type: "picture-marker",
                url: "./app/images/mapIcons/default.png",
                width: "18px",
                height: "18px",
                // type: "text",
                // text: "\ue61d",
                // color: "#687f91",
                // font: {
                //     size: 18,
                //     family: "CalciteWebCoreIcons"
                // }
            }
        },

        _subGroups: ["State Average", "District Average", "School Average", "Male", "Female", "White", "Black", "Asian", "Hispanic", "Native American", "Pacific Islander", "Two or More Races", "SPED", "ELL", "FRL", "Migrant", "Homeless"],

        subGroupsAll: ["State Average", "District Average", "School Average", "Male", "Female", "White", "Black", "Asian", "Hispanic", "Native American", "Pacific Islander", "Two or More Races", "SPED", "ELL", "FRL", "Migrant", "Homeless"],

        subGroups: ["All Students", "Male", "Female", "White", "Black", "Asian", "Hispanic", "Native American", "Pacific Islander", "Two or More Races", "SPED", "ELL", "FRL", "Migrant", "Homeless"],

        AzMERITcat: [{
            Rank: "Very Low",
            RankNum: 5
        }, {
            Rank: "Low",
            RankNum: 4
        }, {
            Rank: "Middle",
            RankNum: 3
        }, {
            Rank: "High",
            RankNum: 2
        }, {
            Rank: "Very High",
            RankNum: 1
        }],

        stateAzMERIT2018ela: [0, 40, 19, 29, 11],
        stateAzMERIT2018math: [0, 37, 22, 27, 15],
        stateAzMERIT2017ela: [0, 41, 20, 29, 10],
        stateAzMERIT2017math: [0, 36, 24, 26, 13],
        stateAzMERIT2016ela: [0, 42, 20, 28, 10],
        stateAzMERIT2016math: [0, 38, 25, 26, 11],
        stateAzMERIT2015ela: [0, 42, 23, 28, 7],
        stateAzMERIT2015math: [0, 38, 27, 24, 11],

        //FY: 2015, 2016, 2017, 2018
        stateELAPassing: [34, 38, 39, 41],
        stateMATHPassing: [35, 38, 40, 41],
        stateSCIPassing: [53, 53, 53, 52],

        // Chronic Absent Rate for State
        // All Students, All Grades
        stateChronicRate2014: 13,
        stateChronicRate2015: 14,
        stateChronicRate2016: 14,
        stateChronicRate2017: 0,
        stateChronicRate2018: 0,

        subGroups1: [
            "All Students",
            "Male",
            "Female",
            "White",
            "Black",
            "Asian",
            "Hispanic",
            "Native American",
            "Pacific Islander",
            "Two or More",
            "SPED",
            "ELL",
            "FRL",
            "Migrant",
            "Homeless"
        ],

        sortOrder: {
            "All Students": 0,
            "Male": 1,
            "Female": 2,
            "White": 3,
            "Black": 4,
            "Asian": 5,
            "Hispanic": 6,
            "Native American": 7,
            "Pacific Islander": 8,
            "Two or More": 9,
            "SPED": 10,
            "ELL": 11,
            "FRL": 12,
            "Migrant": 13,
            "Homeless": 14
        },

        defalutAzMERIT: [{
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "All",
            level: "",
            schoolID: 0,
            sort: 0
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Male",
            level: "",
            schoolID: 0,
            sort: 1
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Female",
            level: "",
            schoolID: 0,
            sort: 2
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "White",
            level: "",
            schoolID: 0,
            sort: 3
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Black",
            level: "",
            schoolID: 0,
            sort: 4
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Asian",
            level: "",
            schoolID: 0,
            sort: 5
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Hispanic",
            level: "",
            schoolID: 0,
            sort: 6
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Native American",
            level: "",
            schoolID: 0,
            sort: 7
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Pacific Islander",
            level: "",
            schoolID: 0,
            sort: 8
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Two or More Races",
            level: "",
            schoolID: 0,
            sort: 9
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "SPED",
            level: "",
            schoolID: 0,
            sort: 10
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "ELL",
            level: "",
            schoolID: 0,
            sort: 11
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "FRL",
            level: "",
            schoolID: 0,
            sort: 12
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Migrant",
            level: "",
            schoolID: 0,
            sort: 13
        }, {
            ELA1: 0,
            ELA2: 0,
            ELA3: 0,
            ELA4: 0,
            ELAP: 0,
            FY: "",
            area: "",
            countyID: 0,
            distID: 0,
            entityID: 0,
            group: "Homeless",
            level: "",
            schoolID: 0,
            sort: 14
        }]


    };
});
