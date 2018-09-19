/* ========================================================================
 * Maricopa Association of Governments
 * JS document
 * @project     MAG Schools Data Visualization Project
 * @summary     main JavaScript file
 * @file        main.js
 * ======================================================================== */

$(document).ready(function () {
    setup();

    $("#navbar-section1").load("app/views/section-navbar1.html", function () {
        // $("#navbar-section1").hide();
        // $("#main1").hide();
    });
    $("#navbar-section2").load("app/views/section-navbar2.html", function () {
        $("#navbar-section2").hide();
        $("#main2").hide();
    });

    $("#footer-section").load("app/views/section-footer.html", function () {
        //*** terms binding
        $("#termsModal").load("app/views/modal-terms.html");
        //*** privacy binding
        $("#privacyModal").load("app/views/modal-privacy.html");
        $("#aboutModal").load("app/views/modal-about.html");
        $("#linksModal").load("app/views/modal-links.html");
    });

    $("#main-selection-map").load("app/views/main-selection-map.html");

    // School Sections
    $("#main-school-details").load("app/views/main-school-details.html");
    $("#main-school-passing").load("app/views/main-school-passing.html");
    $("#main-school-compare").load("app/views/main-school-compare.html");
    $("#main-school-breakdown").load("app/views/main-school-breakdown.html");
    $("#main-school-gradelevel-enrollment").load("app/views/main-school-gradelevel-enrollment.html");
    $("#main-school-demographics").load("app/views/main-school-demographics.html");
    $("#main-school-subgroup").load("app/views/main-school-subgroup.html");
    $("#main-school-chronic-sub").load("app/views/main-school-chronic-sub.html");
    $("#main-school-chronic-grade").load("app/views/main-school-chronic-grade.html");

    $("#main-school-frl-chart").load("app/views/main-school-frl-chart.html");
    $("#main-school-cohort-trends").load("app/views/main-school-cohort-trends.html");
    $("#main-school-trends").load("app/views/main-school-trends.html");
    $("#main-school-enrollment").load("app/views/main-school-enrollment.html");
    $("#main-school-cohorts").load("app/views/main-school-cohorts.html");

    // $("#main-school-bygrade").load("app/views/main-school-bygrade.html");
    // $("#main-school-byrace").load("app/views/main-school-byrace.html");

    // District Sections
    $("#main-district-sum-table").load("app/views/main-district-sum-table.html");
    $("#main-district-scatter-chart").load("app/views/main-district-scatter-chart.html");

    // State Sections
    $("#main-state-histograms").load("app/views/main-state-histograms.html");
    $("#main-state-scatter-scores").load("app/views/main-state-scatter-scores.html");
    // $("#main-state-scatter-frl").load("app/views/main-state-scatter-frl.html");
});

function setup() {
    var selectedYear;
    var selectedSchool;
    var schoolData;
    var numCalls = 0;

    function QueryError(error) {
        console.error(error.message);
    }

    require([
            "dojo/parser",
            "dojo/topic",
            "esri/tasks/QueryTask",

            "appPackages/config",
            "appPackages/maps-vm",
            "appPackages/scatterChart-vm",
            "appPackages/azBreakdown-vm",
            "appPackages/infoBadges-vm",
            "appPackages/passingCharts-vm",
            "appPackages/chronicCharts-vm",
            "appPackages/enrollmentCharts-vm",
            "appPackages/enrollmentTables-vm",
            "appPackages/frlScatterChart-vm",
            "appPackages/demographicsChart-vm",
            "appPackages/azMeritTrends-vm",
            "appPackages/districtTable-vm",
            "appPackages/enrollmentSubgroups-vm",
            "appPackages/compareCharts-vm",
            "appPackages/districtScatterChart-vm",
            "appPackages/frlTrendChart-vm",
            "appPackages/scoreCohortCharts-vm",
            "appPackages/histogramChart-vm",

            "dojo/domReady!"
        ],
        function (parser, tp, QueryTask, appConfig, mapsVM, scatterChartVM, azBreakdownVM, infoBadgesVM, passingChartsVM, chronicChartsVM, enrollmentChartsVM, enrollmentTablessVM, frlScatterChartVM, demographicsChartVM, azMeritTrendsVM, districtTableVM, enrollmentSubgroupsVM, compareChartsVM, districtScatterChartVM, frlTrendChartVM, scoreCohortChartsVM, histogramChartVM) {

            parser.parse();

            selectedYear = appConfig.startYear;

            // add version and date to about.html, changed in config.js
            $(".version").text(appConfig.version);
            $(".copyright").text(appConfig.copyright);

            $("#page2").on("click", function () {
                $("#navbar-section2").hide();
                $("#navbar-section1").show();
                $("#main2").hide();
                $("#main1").show();
                tp.subscribe("clearBoxs", function (e) {
                    // console.log("asdfasdf");

                    //console.log(e);
                });

            });

            selectFY();

            function selectFY() {
                $("#year-filtering-tabs").kendoTabStrip({
                    dataSource: ["2015", "2016", "2017", "2018"],
                    change: function (e) {
                        selectedYear = this.value();
                        $(".selected-year").text(selectedYear);
                        tp.publish("selectedYear", selectedYear);

                        // getSchoolsList();
                    }
                }).data("kendoTabStrip").select(2);
            }

            //=================================================================================>

            //=================================================================================>

            /**
             * [getSchoolsList - gets the list of schools for the drop-down menu]
             * @return {[type]} [description]
             */
            // function getSchoolsList() {
            //     var queryTask;
            //     var query = {};

            //     queryTask = new QueryTask(appConfig.mainURL + "/6");
            //     query.where = "EntityID > 0";
            //     query.returnGeometry = false;
            //     query.outFields = ["*"];
            //     queryTask.execute(query).then(azSchoolsListQueryHandler);
            // }

            /**
             * [Queries AzSchools_InfoData for yearly stats ]
             * @param  {schoolSelected} e [SchoolEntityID, FY]
             * @return {azSchoolsQueryHandler}
             * @return {QueryError} [error]
             */
            function getSchoolsData() {
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/0");
                query.where = "FY = " + selectedYear + " AND SchoolEntityID > 0";
                query.returnGeometry = false;
                query.outFields = ["*"];
                // console.log(query.where);
                queryTask.execute(query).then(azSchoolsQueryHandler);
            }

            /**
             * [getSchoolLocation]
             * @param  {schoolSelected} e [EntityID, FY]
             * @return {schoolPointQueryHandler}
             * @return {QueryError} [error]
             */
            function getSchoolLocation(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/0");
                query.where = "EntityID = " + dataItem.entityID + " AND FY = " + dataItem.FY;
                query.returnGeometry = true;
                query.outFields = ["*"];

                queryTask.execute(query).then(schoolPointQueryHandler);
            }

            /**
             * [getAzMeritScores]
             * @param  {schoolSelected} e [EntityID, Subgroup, TestLevel]
             * @return {schoolScoresQueryHandler}
             * @return {schoolAZMERITQueryHandler}
             * @return {QueryError} [error]
             */
            function getAzMeritScores(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                azMerit1();
                azMerit2();
                azMerit3();

                function azMerit1() {
                    queryTask = new QueryTask(appConfig.mainURL + "/1");
                    query.where = "EntityID = " + dataItem.entityID + " AND Subgroup = 0 AND TestLevelNum = 0";
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);
                    queryTask.execute(query).then(schoolScoresQueryHandler);
                }

                function azMerit2() {
                    queryTask = new QueryTask(appConfig.mainURL + "/1");
                    query.where = "EntityID = " + dataItem.entityID + " AND TestLevelNum = 0";
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);
                    queryTask.execute(query).then(schoolAZMERITQueryHandler);
                }

                function azMerit3() {
                    queryTask = new QueryTask(appConfig.mainURL + "/1");
                    // query.where = "EntityID = " + dataItem.entityID + " AND Subgroup = 0 AND (TestOrder > 0 AND TestOrder < 7) ";
                    query.where = "EntityID = " + dataItem.entityID + " AND Subgroup = 0 AND TestOrder > 0";
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);
                    queryTask.execute(query).then(AZMERITcohortsQueryHandler);
                }
            }

            function getAIMSscores(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                getSchoolAIMSscores();
                getDistrictAIMSscores();

                /**
                 * [getSchoolAIMSscores description]
                 * @param  {[type]} e [description]
                 * @return {[type]}   [description]
                 */
                function getSchoolAIMSscores() {
                    queryTask = new QueryTask(appConfig.mainURL + "/2");
                    query.where = "EntityID = " + dataItem.entityID + " AND GradeCohort = 0";
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);
                    queryTask.execute(query).then(schoolAIMSscoresQueryHandler);
                }

                /**
                 * [getDistrictAIMSscores description]
                 * @param  {[type]} e [description]
                 * @return {[type]}   [description]
                 */
                function getDistrictAIMSscores() {
                    queryTask = new QueryTask(appConfig.mainURL + "/2");
                    query.where = "EntityID = " + dataItem.dID + " AND GradeCohort = 0";
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);
                    queryTask.execute(query).then(districtAIMSscoresQueryHandler);
                }
            }

            /**
             * [getDistrictData]
             * @param  {schoolSelected} e [DistrictEntityID, FY]
             * @return {districtDataQueryHandler}
             * @return {QueryError} [error]
             */
            function getDistrictData(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/0");
                query.where = "DistrictEntityID = " + dataItem.dID + " AND FY = " + selectedYear;
                query.returnGeometry = false;
                query.outFields = ["*"];
                // console.log(query.where);
                queryTask.execute(query).then(districtDataQueryHandler);
            }

            /**
             * [getDistrictScores]
             * @param  {schoolSelected} e [DistrictEntityID]
             * @return {districtScoresQueryHandler}   [description]
             * @return {QueryError} [error]
             */
            function getDistrictScores(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/1");
                query.where = "EntityID = " + dataItem.dID + " AND FY = " + dataItem.FY + " AND Subgroup = 0 AND TestLevelNum = 0";
                // console.log(query.where);
                query.returnGeometry = false;
                query.outFields = ["*"];
                queryTask.execute(query).then(districtScoresQueryHandler);
            }

            /**
             * [getSchoolBreakDown]
             * @param  {schoolSelected} e [EntityID & selectedYear]
             * @return {schoolBreakdownQueryHandler}
             * @return {QueryError} [error]
             */
            function getSchoolBreakDown(e) {
                var query = {};
                var dataItem = e;
                var queryTask = new QueryTask(appConfig.mainURL + "/1");
                query.where = "EntityID = " + dataItem.entityID + "AND FY = " + selectedYear;
                query.returnGeometry = false;
                query.outFields = ["*"];
                queryTask.execute(query).then(azBreakdownVM.schoolBreakdownQueryHandler);
            }

            /**
             * [getgetTestTrends]
             * @param  {schoolSelected} e [EntityID & TestLevel]
             * @return {azMeritTrendsQueryHandler}
             * @return {QueryError} [error]
             */
            function getTestTrends(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/1");
                query.where = "EntityID = " + dataItem.entityID + " AND TestLevelNum = 0";
                // console.log(query.where);
                query.returnGeometry = false;
                query.outFields = ["*"];
                queryTask.execute(query).then(azMeritTrendsVM.azMeritTrendsQueryHandler);
            }

            /**
             * [getDistrictBreakDown]
             * @param  {schoolSelected} e [EntityID & selectedYear]
             * @return {districtBreakdownQueryHandler}
             * @return {QueryError} [error]
             */
            function getDistrictBreakDown(e) {
                var query = {};
                var dataItem = e;
                var queryTask = new QueryTask(appConfig.mainURL + "/1");
                query.where = "EntityID = " + dataItem.dID + "AND FY = " + selectedYear;
                // query.where = "EntityID = " + dataItem.dID + "AND FY = " + year + " AND Subgroup = 0";
                query.returnGeometry = false;
                query.outFields = ["*"];
                queryTask.execute(query).then(azBreakdownVM.districtBreakdownQueryHandler);
            }

            /**
             * [getStateBreakDown]
             * @param  {state data} [EntityID & selectedYear]
             * @return {stateBreakdownQueryHandler}
             * @return {QueryError} [error]
             */
            function getStateBreakDown() {
                var query = {};
                var queryTask = new QueryTask(appConfig.mainURL + "/1");
                query.where = "EntityID = -1" + " AND SchoolType = 'All'" + " AND FY = " + selectedYear;
                // query.where = "EntityID = -1" + " AND FY = " + year + " AND Subgroup = 0";
                query.returnGeometry = false;
                query.outFields = ["*"];
                // console.log(query.where);
                queryTask.execute(query).then(azBreakdownVM.stateBreakdownQueryHandler);
            }

            /**
             * [getChronicData]
             * @param  {schoolSelected}  e [EntityID & selectedYear]
             * @return {chronicDataQueryHandler}
             * @return {QueryError} [error]
             */
            function getChronicData(e) {
                var dataItem = e;
                var queryTask;
                var query = {};

                queryTask = new QueryTask(appConfig.mainURL + "/5");
                query.where = "EntityID = " + dataItem.entityID + " AND FY = " + selectedYear;
                query.returnGeometry = false;
                query.outFields = ["*"];
                // console.log(query.where);

                queryTask.execute(query).then(chronicDataQueryHandler);
            }

            /**
             * [getEnrollmentData]
             * @param  {schoolSelected} e [EntityID]
             * @return {enrollmentGradeQueryHandler}   [description]
             * @return {QueryError} [error]
             */
            function getEnrollmentData(e) {
                var dataItem = e;
                // console.log(dataItem);
                var queryTask;
                var query = {};
                gradeEnroll();
                raceEnroll();
                raceEnrollDistrict();

                function gradeEnroll() {
                    queryTask = new QueryTask(appConfig.mainURL + "/3");
                    query.where = "EntityID = " + dataItem.entityID;
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);

                    queryTask.execute(query).then(enrollmentGradeQueryHandler);
                }

                function raceEnroll() {
                    queryTask = new QueryTask(appConfig.mainURL + "/4");
                    query.where = "EntityID = " + dataItem.entityID + " AND FY = " + selectedYear;
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);

                    queryTask.execute(query).then(enrollmentRaceQueryHandler);
                }

                function raceEnrollDistrict() {
                    queryTask = new QueryTask(appConfig.mainURL + "/4");
                    query.where = "EntityID = " + dataItem.dID + " AND FY = " + selectedYear;
                    query.returnGeometry = false;
                    query.outFields = ["*"];
                    // console.log(query.where);

                    queryTask.execute(query).then(enrollmentRaceDistrictQueryHandler);
                }
            }

            //================================================================================================>

            /**
             * [azSchoolsListQueryHandler]
             * @param  {getSchoolsList()}
             * @return {error}
             */
            function azSchoolsListQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var sList = [];
                $.each(features, function (index, item) {
                    var i = item.attributes;
                    sList.push({
                        schoolName: i.SchoolName,
                        districtName: i.DistrictName,
                        districtID: i.DistrictEntityID,
                        entityID: i.EntityID,
                        city: i.QCity,
                        zip: i.QZip
                    });
                });
                // console.log(sList);
                // schoolsList(sList);
                // lookupLists(sList);
            }

            /**
             * [schoolPointQueryHandler]
             * @param  {getSchoolPoint()}
             * @return {[map]}
             */
            function schoolPointQueryHandler(response) {
                var feature = response.features[0];
                // console.log(feature);

                var pin;
                // https://developers.arcgis.com/javascript/3/samples/portal_symbols/index.html
                // https://developers.arcgis.com/net/10-2/store/api-reference/html/6a641604-55f8-4173-88ce-9d0c9791db24.htm
                // if (selectedYear === "2015") {
                //     pin = "http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png";
                // }
                // if (selectedYear === "2016") {
                //     pin = "http://static.arcgis.com/images/Symbols/Shapes/GreenPin1LargeB.png";
                // }
                // if (selectedYear === "2017") {
                //     pin = "http://static.arcgis.com/images/Symbols/Shapes/PurplePin1LargeB.png";
                // }
                // if (selectedYear === "2018") {
                //     pin = "http://static.arcgis.com/images/Symbols/Shapes/RedPin1LargeB.png";
                // }
                // pin = "<i class='fas fa-school fa-2x'></i>";
                // '<img class="arrow" src="./app/images/arrowUp.png" alt="UP">';
                pin = "http://static.arcgis.com/images/Symbols/PeoplePlaces/School.png";

                feature.symbol = {
                    type: "picture-marker",
                    url: pin,
                    width: "25px",
                    height: "25px"
                };

                feature.popupTemplate = {
                    title: "School",
                    content: "{SchoolName}<br>{PAddress}<br>{PCity}"
                }

                gfxLyr2.removeAll();
                gfxLyr2.add(feature);
                view2.goTo(feature).then(function () {
                    view2.zoom = 16;
                });
            }

            /**
             * [azSchoolsQueryHandler]
             * @param  {getSchoolsData()}
             * @return {[scatterChartVM, frlScatterChartVM]}
             */
            function azSchoolsQueryHandler(results) {
                var features = results.features;
                schoolData = results;
                // console.log(features);

                var azSchoolInfo = [];
                var azSchoolsScatter = [];
                var azSchoolsFRL = [];
                var azSchoolsHistogram = [];
                var schoolList = [];

                $.each(features, function (index, item) {
                    var i = item.attributes;
                    if (selectedSchool === i.EntityID) {

                        azSchoolInfo.push({
                            sName: i.SchoolName,
                            dName: i.DistrictName,
                            dID: i.DistrictEntityID,
                            entityID: i.EntityID,
                            FY: i.FY,
                            address: i.PAddress,
                            city: i.PCity,
                            zip: i.ZIPcode,
                            grades: i.GradesServed,
                            sClass: i.EntityClass,
                            sType: i.SchoolType,
                            active: i.Active,
                            titleI: i.TitleI,
                            frl: i.FRL,
                            frlp: i.FRL_CALC,
                            score: i.Score,
                            grade: i.ADE_Grade,
                            chronic: i.ChronicAbsence,
                            attend: i.AttendanceRate,
                            ELAp: i.ELA_Passing,
                            MATHp: i.MATH_Passing
                        });
                    }

                    if (selectedYear === i.FY) {
                        schoolList.push({
                            schoolName: i.SchoolName,
                            districtName: i.DistrictName,
                            dID: i.DistrictEntityID,
                            entityID: i.EntityID,
                            FY: i.FY,
                            address: i.PAddress,
                            city: i.PCity,
                            zip: i.ZIPcode,
                            grades: i.GradesServed,
                            sClass: i.EntityClass,
                            sType: i.SchoolType
                        });
                    }

                    azSchoolsScatter.push({
                        sName: i.SchoolName,
                        entityID: i.EntityID,
                        FY: i.FY,
                        ELAp: i.ELA_Passing,
                        MATHp: i.MATH_Passing,
                        rank: i.Rank,
                        rankSort: i.RankNum
                    });

                    azSchoolsFRL.push({
                        sName: i.SchoolName,
                        entityID: i.EntityID,
                        FY: i.FY,
                        frl: i.FRL_CALC,
                        score: i.Score
                    });

                    azSchoolsHistogram.push({
                        sName: i.SchoolName,
                        entityID: i.EntityID,
                        FY: i.FY,
                        ELAp: i.ELA_Passing,
                        MATHp: i.MATH_Passing,
                        rank: i.Rank,
                        rankSort: i.RankNum
                    });

                });
                // console.log(azSchoolInfo);
                // console.log(azSchoolsScatter);

                schoolInfo(azSchoolInfo);
                // lookupLists(schoolList);
                scatterChartVM.azMERITscatterChart(azSchoolsScatter);
                // frlScatterChartVM.frlScatterChart(azSchoolsFRL);
                histogramChartVM.chartData(azSchoolsHistogram);
            }

            /**
             * [districtDataQueryHandler]
             * @param  {getDistrictData()}
             * @return {[districtTableVM]}
             * @return {QueryError} [error]
             */
            function districtDataQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var distInfo = [];
                $.each(features, function (index, item) {
                    var x = item.attributes;
                    distInfo.push(x);
                });
                // console.log(distInfo);

                districtTableVM.districtTable(distInfo);
                districtScatterChartVM.distScatterChart(distInfo);
            }

            /**
             * [districtScoresQueryHandler]
             * @param  {getDistrictScores()}
             * @return {[compareChartsVM]}
             */
            function districtScoresQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var distScores = [];
                $.each(features, function (index, item) {
                    var x = item.attributes;
                    distScores.push(x);
                });
                // console.log(distScores);
                // compareChartsVM.createComparisonChart(distScores);
                compareChartsVM.createComparBarChart(distScores);
            }

            /**
             * [districtAIMSscoresQueryHandler] - AIMS Schools Scores
             * @param  {getDistrictAIMSScores()}
             * @return {[passingChartsVM]}
             */
            function districtAIMSscoresQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                compareChartsVM.distSCIscore(features);
            }

            /**
             * [schoolScoresQueryHandler] - AzMERIT Schools Scores
             * @param  {getAzMeritScores()}
             * @return {[passingChartsVM]}
             */
            function schoolScoresQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var f2018 = [];
                var f2017 = [];
                var f2016 = [];
                var f2015 = [];
                $.each(features, function (index, item) {
                    var x = item.attributes;
                    if (x.FY === 2015) {
                        f2015.push(x);
                    }
                    if (x.FY === 2016) {
                        f2016.push(x);
                    }
                    if (x.FY === 2017) {
                        f2017.push(x);
                    }
                    if (x.FY === 2018) {
                        f2018.push(x);
                    }
                });
                // console.log(f2015);
                // console.log(f2016);
                // console.log(f2017);
                // console.log(f2018);

                var info2015ela;
                var info2015math;
                if (f2015.length > 0) {
                    $.each(f2015, function (index, item) {
                        if (item.ContentArea === 675) {
                            info2015ela = item;
                        }
                        if (item.ContentArea === 677) {
                            info2015math = item;
                        }
                    });
                } else {
                    info2015ela = 0;
                    info2015math = 0;
                }
                // console.log(info2015ela);
                // console.log(info2015math);

                var info2016ela;
                var info2016math;
                if (f2016.length > 0) {
                    $.each(f2016, function (index, item) {
                        if (item.ContentArea === 675) {
                            info2016ela = item;
                        }
                        if (item.ContentArea === 677) {
                            info2016math = item;
                        }
                    });
                } else {
                    info2016ela = 0;
                    info2016math = 0;
                }
                // console.log(info2016ela);
                // console.log(info2016math);

                var info2017ela;
                var info2017math;
                if (f2017.length > 0) {
                    $.each(f2017, function (index, item) {
                        if (item.ContentArea === 675) {
                            info2017ela = item;
                        }
                        if (item.ContentArea === 677) {
                            info2017math = item;
                        }
                    });
                } else {
                    info2017ela = 0;
                    info2017math = 0;
                }
                // console.log(info2017ela);
                // console.log(info2017math);

                var info2018ela;
                var info2018math;
                if (f2018.length > 0) {
                    $.each(f2018, function (index, item) {
                        if (item.ContentArea === 675) {
                            info2018ela = item;
                        }
                        if (item.ContentArea === 677) {
                            info2018math = item;
                        }
                    });
                } else {
                    info2018ela = 0;
                    info2018math = 0;
                }
                // console.log(info2018ela);
                // console.log(info2018math);

                var e1, e2;
                if (selectedYear === "2015") {
                    e1 = info2015ela;
                    e2 = info2015math;
                }
                if (selectedYear === "2016") {
                    e1 = info2016ela;
                    e2 = info2016math;
                }
                if (selectedYear === "2017") {
                    e1 = info2017ela;
                    e2 = info2017math;
                }
                if (selectedYear === "2018") {
                    e1 = info2018ela;
                    e2 = info2018math;
                }
                // passingChartsVM.score(e1, e2);
                self.elaP = e1;
                self.mathP = e2;

                self.m2015 = [info2015ela, info2015math];
                self.m2016 = [info2016ela, info2016math];
                self.m2017 = [info2017ela, info2017math];
                self.m2018 = [info2018ela, info2018math];
                // passingChartsVM.diffScore(v2015, v2016, v2017);
                allDone();
            }

            /**
             * [AZMERITcohortsQueryHandler description]
             * @param  {[type]} results [description]
             * @return {[type]}         [description]
             */
            function AZMERITcohortsQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                scoreCohortChartsVM.scoreCohortChart(features);
            }

            /**
             * [schoolAZMERITQueryHandler description]
             * @param  {[type]} results [description]
             * @return {[type]}         [description]
             */
            function schoolAZMERITQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                frlTrendChartVM.frlTrendChart(features);
            }

            /**
             * [schoolAIMSscoresQueryHandler] - AIMS Schools Scores
             * @param  {getSchoolScores()}
             * @return {[passingChartsVM]}
             */
            function schoolAIMSscoresQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var f2018 = [];
                var f2017 = [];
                var f2016 = [];
                var f2015 = [];
                $.each(features, function (index, item) {
                    var x = item.attributes;
                    if (x.FY === 2015) {
                        f2015.push(x);
                    }
                    if (x.FY === 2016) {
                        f2016.push(x);
                    }
                    if (x.FY === 2017) {
                        f2017.push(x);
                    }
                    if (x.FY === 2018) {
                        f2018.push(x);
                    }
                });
                // console.log(f2015);
                // console.log(f2016);
                // console.log(f2017);

                var info2018sci;
                var info2017sci;
                var info2016sci;
                var info2015sci;;
                if (f2015.length > 0) {
                    $.each(f2015, function (index, item) {
                        info2015sci = item;
                    });
                } else {
                    info2015sci = 0;
                }
                if (f2016.length > 0) {
                    $.each(f2016, function (index, item) {
                        info2016sci = item;
                    });
                } else {
                    info2016sci = 0;
                }
                if (f2017.length > 0) {
                    $.each(f2017, function (index, item) {
                        info2017sci = item;
                    });
                } else {
                    info2017sci = 0;
                }
                if (f2018.length > 0) {
                    $.each(f2018, function (index, item) {
                        info2018sci = item;
                    });
                } else {
                    info2018sci = 0;
                }

                var e3;
                if (selectedYear === "2015") {
                    e3 = info2015sci;
                }
                if (selectedYear === "2016") {
                    e3 = info2016sci;
                }
                if (selectedYear === "2017") {
                    e3 = info2017sci;
                }
                if (selectedYear === "2018") {
                    e3 = info2018sci;
                }
                // passingChartsVM.score(e1, e2, e3);
                self.sciP = e3;
                // console.log(e3);

                self.a2015 = [info2015sci];
                self.a2016 = [info2016sci];
                self.a2017 = [info2017sci];
                self.a2018 = [info2018sci];
                // passingChartsVM.diffScore(v2015, v2016, v2017);

                var passingSCI = [info2015sci, info2016sci, info2017sci, info2018sci];
                azMeritTrendsVM.sciAIMSdata(passingSCI);
                // scoreBind();
                allDone();
            }

            function allDone() {
                if (numCalls === 1) {
                    // console.log("YES ALL DONE");
                    scoreBind();
                } else {
                    numCalls++;
                    // console.log(numCalls);
                }
            }

            function scoreBind() {

                var passingObj = {
                    e1: self.elaP,
                    e2: self.mathP,
                    e3: self.sciP
                };

                var v2015 = self.m2015.concat(self.a2015);
                var v2016 = self.m2016.concat(self.a2016);
                var v2017 = self.m2017.concat(self.a2017);
                var v2018 = self.m2018.concat(self.a2018);

                passingChartsVM.score(passingObj);
                passingChartsVM.diffScore(v2015, v2016, v2017, v2018);
            }

            /**
             * [chronicDataQueryHandler]
             * @param  {getChronicData()}
             * @return {[chronicChartsVM]}
             */
            function chronicDataQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var chronicInfo = [];
                if (features.length > 0) {
                    $.each(features, function (index, item) {
                        chronicInfo.push({
                            fy: item.attributes.FY,
                            entityID: item.attributes.EntityID,
                            gradeLevel: item.attributes.GradeLevel,
                            gradeLevelDef: item.attributes.GradeLevelDef,
                            subGroup: item.attributes.Subgroup,
                            subGroupDef: item.attributes.SubgroupDef,
                            PCT_Absences: item.attributes.PCT_18plus_Absences_num,
                            PCT_AbsencesText: item.attributes.PCT_18plus_Absences_text
                        });
                    });
                } else {
                    chronicInfo;
                }
                // console.log(chronicInfo);
                chronicChartsVM.chronicAbsenceChart(chronicInfo);
            }

            /**
             * [enrollmentGradeQueryHandler]
             * @param  {getEnrollmentData()}
             * @return {}
             */
            function enrollmentGradeQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var enrollmentData = [];
                var enrollmentInfo = [];
                $.each(features, function (index, item) {
                    enrollmentData.push({
                        fy: item.attributes.FY,
                        entityID: item.attributes.EntityID,
                        ps: item.attributes.PS,
                        kg: item.attributes.KG,
                        g1: item.attributes.G1,
                        g2: item.attributes.G2,
                        g3: item.attributes.G3,
                        total: item.attributes.Total,
                    });
                    enrollmentInfo.push(item.attributes);
                });
                // console.log(enrollmentData);
                // console.log(enrollmentInfo);
                enrollmentChartsVM.enrollmentChart(enrollmentData);
                enrollmentChartsVM.enrollmentCohorts(enrollmentInfo);
                enrollmentChartsVM.enrollmentGradeLevel(enrollmentInfo);
                enrollmentTablessVM.enrollmentTableGrade(enrollmentInfo);
            }

            /**
             * [enrollmentRaceQueryHandler]
             * @param  {getEnrollmentData()}
             * @return {[enrollmentTablessVM, demographicsChartVM]}
             */
            function enrollmentRaceQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var raceEnrollment = [];
                var subgroupEnroll = [];
                $.each(features, function (index, item) {
                    raceEnrollment.push(item.attributes);
                    subgroupEnroll.push({
                        subgroup: item.attributes.SubgroupDef,
                        total: item.attributes.Total
                    });
                });
                // console.log(raceEnrollment);
                // console.log(subgroupEnroll);

                enrollmentTablessVM.enrollmentTableRace(raceEnrollment);
                demographicsChartVM.studentDemoChart(raceEnrollment);
                enrollmentSubgroupsVM.enrollmentSubgroupChart(subgroupEnroll);
            }

            /**
             * [enrollmentRaceDistrictQueryHandler]
             * @param  {getEnrollmentData()}
             * @return {[demographicsChartVM]}
             */
            function enrollmentRaceDistrictQueryHandler(results) {
                var features = results.features;
                // console.log(features);

                var raceEnrollment = [];
                $.each(features, function (index, item) {
                    if (item.attributes.Subgroup === 0) {
                        raceEnrollment.push(item.attributes);
                    }
                });
                demographicsChartVM.districtDemoChart(raceEnrollment);
            }

            //============================================================================================================>

            tp.subscribe("schoolList", function (e) {
                schoolsList(e);
            });

            /**
             * [populates the drop-down menu for "Find a School"]
             * @param  {[type]} e [description]
             * @return {[type]}   [description]
             */
            function schoolsList(e) {
                var dataItem = e;

                $("#ddlSchoolsMain").kendoComboBox({
                    dataTextField: "name",
                    dataValueField: "id",
                    filter: "none",
                    template: "${data.name}" + " - <span style='font-size: 12px;'>${data.city}" + " (${data.id})</span>",
                    dataSource: {
                        data: dataItem,
                        sort: {
                            field: "name",
                            dir: "asc"
                        }
                    },
                    // index: 6,
                    placeholder: "Select a School",
                    change: onChange
                });
                // var schoolData = $("#ddlSchoolsMain").data("kendoComboBox");
                // var dataItem = schoolData.dataItem();
                // selectedSchool = dataItem.entityID;

                // getSchoolsData();

                // gets the input from District Table to change school selection
                tp.subscribe("newSchool", function (e) {
                    var linkSchoolID = e;
                    selectedSchool = linkSchoolID;
                    // console.log(selectedSchool);
                    // changes the combobox selection
                    $("#ddlSchoolsMain").data("kendoComboBox").value(selectedSchool);

                    getSchoolsData();
                });

                function onChange() {
                    var schoolData = $("#ddlSchoolsMain").data("kendoComboBox");
                    var dataItem = schoolData.dataItem();
                    if (dataItem != undefined) {
                        selectedSchool = dataItem.entityID;
                        getSchoolsData();
                        // toggles the Assessment Type back to ELA from MATH
                        $("#option1").parents(".btn").button("toggle");
                    } else {
                        return
                    }
                }
            }

            /**
             * [schoolInfo]
             * Data from [azSchoolsQueryHandler] via [getSchoolsData();]
             * @return
             */
            function schoolInfo(results) {
                var features = results;
                // console.log(features);

                var dataItem = {};
                $.each(features, function (index, item) {
                    dataItem = item;
                });
                // console.log(dataItem);

                // school name & district name
                $(".schoolName").text(dataItem.sName);
                $(".schoolID").text("  (" + dataItem.entityID + ")");
                $(".districtName").text(dataItem.dName);
                $(".districtID").text("  (" + dataItem.dID + ")");

                $("#info1").html(dataItem.sClass + " School&nbsp;&nbsp;|&nbsp;&nbsp;" + dataItem.sType + "&nbsp;&nbsp;|&nbsp;&nbsp;" + dataItem.grades);
                $("#info2").html(dataItem.address + " " + dataItem.city + ", AZ " + dataItem.zip);

                tp.publish("schoolSelected", dataItem);

                getSchoolLocation(dataItem);
                getAzMeritScores(dataItem);
                getAIMSscores(dataItem);
                getSchoolBreakDown(dataItem);
                getDistrictBreakDown(dataItem);
                getStateBreakDown();
                getChronicData(dataItem);
                getEnrollmentData(dataItem);
                getTestTrends(dataItem);
                getDistrictData(dataItem);
                getDistrictScores(dataItem);

                tp.publish("badgeInfo", dataItem);
            }

        });
    // end main function
}


/**
 * This is used to open a new window with email contact info
 * @return {[type]} [description]
 */
function openEmailwin() {
    var emailURL = "https://www.azmag.gov/EmailPages/JasonHoward.asp";

    // used to center popup in dual-screen computers
    // Fixes dual-screen position               Most browsers      Firefox
    var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;
    var w = 600;
    var h = 660;
    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;

    var newWindow = window.open(emailURL, "", "resizable=no,location=no,menubar=no,status=no,toolbar=no,fullscreen=no,dependent=no,directories=no,copyhistory=no,scrollbars=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

$(window).scroll(function () {
    "use strict";
    if ($(document).scrollTop() > 20) {
        $(".scrollTop").css("opacity", "1");
    } else {
        $(".scrollTop").css("opacity", "0");
    }

});

$(".scrollTop").click(function () {
    "use strict";
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});

$(window).resize(function () {
    $("#districtScatterChart").data("kendoChart").refresh();
    $("#azMERITchartSchools").data("kendoChart").refresh();
    $("#azMeritTrendsELA").data("kendoChart").refresh();
    $("#azMeritTrendsMATH").data("kendoChart").refresh();
    $("#aimsTrendsSCI").data("kendoChart").refresh();
    $("#compChart").data("kendoChart").refresh();
    $("#enrollmentChart").data("kendoChart").refresh();
    $("#enrollmentCohorts").data("kendoChart").refresh();
    $("#gradelevel-enrollmentChart").data("kendoChart").refresh();
    $("#enrollmentSubgroup").data("kendoChart").refresh();
    $("#scoreCohortChart-ELA").data("kendoChart").refresh();
    $("#scoreCohortChart-MATH").data("kendoChart").refresh();
    $("#elaChart").data("kendoChart").refresh();
    $("#mathChart").data("kendoChart").refresh();
    $("#sciChart").data("kendoChart").refresh();
    $("#allChart").data("kendoChart").refresh();
    $("#passChart").data("kendoChart").refresh();
    $("#histoChartELA").data("kendoChart").refresh();
    $("#histoChartMATH").data("kendoChart").refresh();
    $("#frlELA-TrendChart").data("kendoChart").refresh();
    $("#frlMATH-TrendChart").data("kendoChart").refresh();
    $("#enrollmentRaceSchool").data("kendoChart").refresh();
    $("#enrollmentRaceDistrict").data("kendoChart").refresh();

    $("#chronicSubChart").data("kendoChart").refresh();
    $("#chronicGradeChart").data("kendoChart").refresh();
});
