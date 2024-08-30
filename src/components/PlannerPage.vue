<template>
    <div class="plannerPlanBox">
        <!-- 사이드 스크롤스파이 -->
        <div class="plannerPlanScrollspyBox">
            <div class="plannerPlanScrollspyHeader">
                <div>
                    <h1>{{ title }}</h1>
                </div>
                <button @click="plusDay()" class="plusDayButton">
                    + Day추가
                </button>
            </div>
            <div class="col-4">
                <div class="d-flex flex-column gap-2 text-center">
                    <a
                        v-for="(dayGroup, index) in cells"
                        :key="index"
                        class="p-1 rounded"
                        :href="'#simple-list-item-' + (index + 1)"
                    >
                        Day {{ index + 1 }}
                    </a>
                </div>
            </div>
        </div>
        <div class="planContainer">
            <!-- 제목창-->
            <div id="plannerPlanTopItemsTitle" class="plannerPlanTopBox">
                <input
                    type="text"
                    ref="title"
                    v-model="title"
                    @input="adjustTitleWidth()"
                    :style="{ width: inputTitleWidth }"
                    class="plannerPlanInputTitle"
                />
                <!-- 프린트 버튼 -->
                <button class="printImgBtn">
                    <img src="@/assets/icons/print.png" alt="프린트 이미지" />
                </button>
            </div>

            <!-- 플랜 정보창-->
            <div class="col-8">
                <div
                    data-bs-offset="0"
                    data-bs-smooth-scroll="true"
                    tabindex="0"
                >
                    <div class="PlannerPlanInformationBox">
                        <!-- 데이 정보 칸 -->
                        <!-- 일정이 없을 경우 -->
                        <div v-if="!cells.length">
                            <div
                                id="simple-list-item-1"
                                class="plannerDayFont"
                                style="margin-top: 50px"
                            >
                                "<span style="color: rgba(54, 212, 222, 1)">
                                    +Day추가 </span
                                >" 버튼으로 일정을 추가하십시오.
                            </div>
                        </div>
                        <!-- 일정이 있을 경우 -->
                        <div v-else>
                            <div
                                v-for="(dayGroup, index) in cells"
                                :key="index"
                                :id="'simple-list-item-' + (index + 1)"
                            >
                                <div class="plannerDayBox plannerDayFont">
                                    Day {{ index + 1 }}
                                    <!-- 데이 메뉴바 -->
                                    <div
                                        v-show="activeMenu === index"
                                        class="plannerDayMenuBar"
                                    >
                                        <button
                                            class="plannerDayMenu_plusDetailBoxBtn"
                                            @click="
                                                plannerDay_plusDetail(dayGroup)
                                            "
                                        >
                                            <img
                                                src="@/assets/icons/expandPlan.png"
                                                alt="데이 메뉴바 세부사항 칸 추가 이미지"
                                            />
                                        </button>
                                        <button
                                            class="plannerDayMenu_deleteBtn"
                                            @click="plannerDay_delete(index)"
                                        >
                                            <img
                                                src="@/assets/icons/delete.png"
                                                alt="데이 메뉴바 삭제 이미지"
                                            />
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            class="plannerDayMenuBtn"
                                            type="button"
                                            @click="toggleDayMenu(index)"
                                        >
                                            <img
                                                src="@/assets/icons/planMenu.png"
                                                alt="데이 메뉴버튼 이미지"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <!-- 데이의 세부정보 칸 -->
                                <div
                                    v-for="(
                                        detail, detailIndex
                                    ) in dayGroup.day"
                                    :key="detailIndex"
                                >
                                    <div
                                        class="plannerDetailBox plannerDetatilFont"
                                    >
                                        <div class="placeBox">
                                            <div
                                                :style="{
                                                    backgroundImage: `url(${getPlacePhoto(
                                                        detail.place_id
                                                    )})`,
                                                }"
                                                class="place_photoImg"
                                            ></div>
                                            <button
                                                v-if="detail.place_id"
                                                @click="
                                                    revisePlace_id(
                                                        detail.place_id,
                                                        index,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                {{
                                                    getPlaceName(
                                                        detail.place_id
                                                    )
                                                }}
                                            </button>
                                            <button
                                                v-if="!detail.place_id"
                                                @click="
                                                    revisePlace_id(
                                                        detail.place_id,
                                                        index,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                세부일정 추가하기
                                            </button>
                                        </div>
                                        <div
                                            v-show="
                                                activeDetailMenu.dayGroup ===
                                                    index &&
                                                activeDetailMenu.detailIndex ===
                                                    detailIndex
                                            "
                                            class="plannerDetailBtnBar"
                                        >
                                            <button
                                                class="plannerdetailInfoBtn"
                                                type="button"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#offcanvasScrolling"
                                                aria-controls="offcanvasScrolling"
                                                @click="
                                                    fetchPlannerDetailInfoData(
                                                        detail.place_id
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/showDetail.png"
                                                    alt="세부사항 자세히 보기 이미지"
                                                />
                                            </button>

                                            <button
                                                class="plannerdetailMemoBtn"
                                                type="button"
                                                @click="
                                                    plannerdetailMemo(
                                                        index,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/memo.png"
                                                    alt="세부사항 메모 이미지"
                                                />
                                            </button>
                                            <button
                                                class="plannerdetailDeleteBtn"
                                                type="button"
                                                @click="
                                                    plannerdetailDelete(
                                                        dayGroup,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/delete.png"
                                                    alt="세부사항 삭제 이미지"
                                                />
                                            </button>
                                        </div>
                                        <div class="detailToggleBtnBox">
                                            <button
                                                v-if="
                                                    detailIndex !==
                                                    dayGroup.day.length - 1
                                                "
                                                class="plannerdetailRouteBtn"
                                                type="button"
                                                @click="
                                                    toggleDetailRoute(
                                                        index,
                                                        detailIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    src="@/assets/icons/findRoute.png"
                                                    alt="세부사항 경로 찾기 이미지"
                                                />
                                            </button>

                                            <div class="plannerDetailMenuBtn">
                                                <button
                                                    type="button"
                                                    @click="
                                                        toggleDetailMenu(
                                                            index,
                                                            detailIndex
                                                        )
                                                    "
                                                >
                                                    <img
                                                        src="@/assets/icons/planMenu.png"
                                                        alt="데이 메뉴버튼 이미지"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-show="
                                            activeDetailMemo.dayGroup ===
                                                index &&
                                            activeDetailMemo.detailIndex ===
                                                detailIndex
                                        "
                                        class="plannerDetailMemoBar"
                                    >
                                        <input
                                            type="text"
                                            v-model="detail.memo"
                                        />
                                    </div>
                                    <div
                                        v-show="
                                            activeDetailRoute.dayGroup ===
                                                index &&
                                            activeDetailRoute.detailIndex ===
                                                detailIndex
                                        "
                                        class="placeRouteBox"
                                        v-if="
                                            detailIndex !==
                                            dayGroup.day.length - 1
                                        "
                                    >
                                        <div class="placeRouteBox">
                                            <div
                                                v-for="(
                                                    routeArray, routeIndex
                                                ) in getPlaceRoute(
                                                    detail.place_id
                                                )"
                                                :key="routeIndex"
                                            >
                                                <div
                                                    v-if="!routeArray"
                                                    class="route_item"
                                                >
                                                    <img
                                                        src="@/assets/icons/connectRouteLine.png"
                                                        alt="경로 수직선 이미지"
                                                        id="connectRouteLineImg"
                                                    />
                                                    거리가 너무 멉니다.
                                                </div>
                                                <div
                                                    v-if="
                                                        routeArray &&
                                                        !routeArray.transitDetails
                                                    "
                                                    class="route_item"
                                                >
                                                    <img
                                                        src="@/assets/icons/connectRouteLine.png"
                                                        alt="경로 수직선 이미지"
                                                        id="connectRouteLineImg"
                                                    />
                                                    도보
                                                </div>
                                                <div
                                                    v-if="
                                                        routeArray.transitDetails
                                                    "
                                                    class="route_item"
                                                >
                                                    <img
                                                        :src="
                                                            routeArray
                                                                .transitDetails
                                                                ?.transitLine
                                                                ?.vehicle
                                                                ?.iconUri ||
                                                            '@/assets/icons/connectRouteLine.png'
                                                        "
                                                        alt="경로 수직선 이미지"
                                                        :id="
                                                            routeArray
                                                                .transitDetails
                                                                ?.transitLine
                                                                ?.vehicle
                                                                ?.type ===
                                                            'SUBWAY'
                                                                ? 'connectRouteTransferImg'
                                                                : 'connectRouteLineImg'
                                                        "
                                                    />
                                                    <div class="route_details">
                                                        <span
                                                            id="routeLocationFont"
                                                        >
                                                            {{
                                                                routeArray
                                                                    .transitDetails
                                                                    ?.stopDetails
                                                                    ?.departureStop
                                                                    ?.name
                                                            }}
                                                            {{
                                                                routeArray
                                                                    .transitDetails
                                                                    ?.localizedValues
                                                                    ?.departureTime
                                                                    ?.time?.text
                                                            }}
                                                        </span>
                                                        <div
                                                            :style="{
                                                                color: routeArray
                                                                    .transitDetails
                                                                    ?.transitLine
                                                                    ?.color,
                                                            }"
                                                        >
                                                            {{
                                                                routeArray
                                                                    .transitDetails
                                                                    ?.transitLine
                                                                    ?.name
                                                            }}
                                                            <span
                                                                v-if="
                                                                    routeArray
                                                                        .transitDetails
                                                                        ?.transitLine
                                                                        ?.nameShort
                                                                "
                                                            >
                                                                (
                                                                {{
                                                                    routeArray
                                                                        .transitDetails
                                                                        ?.transitLine
                                                                        ?.nameShort
                                                                }}
                                                                )
                                                            </span>
                                                        </div>
                                                        <span
                                                            id="routeLocationFont"
                                                        >
                                                            {{
                                                                routeArray
                                                                    .transitDetails
                                                                    ?.stopDetails
                                                                    ?.arrivalStop
                                                                    ?.name
                                                            }}
                                                            {{
                                                                routeArray
                                                                    .transitDetails
                                                                    ?.localizedValues
                                                                    ?.arrivalTime
                                                                    ?.time?.text
                                                            }}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="plannerSaveBtnBox">
                <button @click="savePlannerPage()">저장</button>
            </div>
        </div>
        <div class="detailInfoOffcanvas">
            <div
                class="offcanvas offcanvas-end"
                data-bs-scroll="true"
                data-bs-backdrop="false"
                tabindex="-1"
                id="offcanvasScrolling"
                aria-labelledby="offcanvasScrollingLabel"
            >
                <div class="offcanvas-header">
                    <div>
                        <h1>{{ selectedDetailPlace.name }}</h1>
                        <br />
                        <p>
                            위치:
                            <strong>
                                {{ selectedDetailPlace.address }}
                            </strong>
                        </p>
                        <p>
                            별점:
                            <strong>
                                {{ selectedDetailPlace.rating }}
                            </strong>
                        </p>
                        <p>
                            전화 번호:
                            <strong>
                                {{ selectedDetailPlace.internationalPhoneNum }}
                            </strong>
                        </p>
                        <p>
                            사이트 주소:
                            <strong>
                                <a
                                    :href="selectedDetailPlace.websiteUri"
                                    target="_blank"
                                    v-if="
                                        selectedDetailPlace.websiteUri !==
                                        '웹사이트 링크 없음'
                                    "
                                >
                                    {{ selectedDetailPlace.websiteUri }}
                                </a>
                                <a v-else>
                                    {{ selectedDetailPlace.websiteUri }}
                                </a>
                            </strong>
                        </p>
                    </div>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <hr class="offcanvasHeaderHr" />
                <div class="offcanvas-body">
                    <!-- 리뷰가 있을 경우 -->
                    <div v-if="selectedDetailPlace.reviews != ''">
                        <div>
                            <div
                                v-for="(
                                    reviews, index
                                ) in selectedDetailPlace.reviews"
                                :key="index"
                            >
                                <p>
                                    <strong>
                                        작성인:
                                        {{ reviews.author }}
                                        (별점: {{ reviews.rating }})
                                    </strong>
                                    <span>
                                        {{ reviews.text }}
                                    </span>
                                </p>
                                <hr />
                            </div>
                        </div>
                    </div>

                    <!-- 리뷰가 없을 경우 -->
                    <div v-else>
                        <p>리뷰가 없습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            user_id: "userId",
            revisePlaceId: "placeId",
        }),
    },
    data() {
        return {
            planner_id: null,
            inputTitleWidth: "",
            title: null,
            activeMenu: null,
            activeDetailMenu: { dayGroup: null, detailIndex: null },
            activeDetailMemo: { dayGroup: null, detailIndex: null },
            activeDetailRoute: { dayGroup: null, detailIndex: null },
            cells: [],
            place_names: [],
            place_photos: [],
            place_routes: [],
            selectedDetailPlace: {
                name: "",
                rating: "",
                address: "",
                internationalPhoneNum: "",
                websiteUri: "",
                reviews: [],
            },
            isFormDirty: true,
        };
    },
    methods: {
        ...mapActions([
            "updateUserId",
            "removeUserId",
            "updatePlaceId",
            "removePlaceId",
        ]),

        async fetchPlannerData(planner_id) {
            try {
                const response = await this.$axios.get(
                    `http://34.64.132.0/api/planners/${planner_id}/`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                );

                console.log("Fetched Data:", response.data);
                console.log("Planner ID:", this.planner_id);
                console.log("Planner ID:", planner_id);

                this.cells = response.data.cells;
                this.title = response.data.title;

                this.adjustTitleWidth();

                const placeIds = [];

                this.cells.forEach((dayEntry) => {
                    dayEntry.day.forEach((entry) => {
                        if (entry.place_id && entry.place_id.trim() !== "") {
                            placeIds.push({ place_id: entry.place_id });
                        }
                    });
                });

                if (placeIds.length > 0) {
                    await this.fetchPlaceData(placeIds);
                    await this.fetchPhotoData(placeIds);
                    await this.fetchRouteData(placeIds);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },

        async fetchPlaceData(placeIds) {
            console.log("Name placeIds:", placeIds);

            const placeNames = [];

            for (const { place_id } of placeIds) {
                try {
                    console.log(`Fetching details for place_id: ${place_id}`);

                    const placeResponse = await this.$axios.get(
                        `http://34.64.132.0/api/googlemaps/placeDetails/?format=json&place_id=${place_id}`
                    );

                    const placeData = placeResponse.data;

                    console.log(
                        `Response for place_id ${place_id}:`,
                        placeData
                    );

                    const primaryName =
                        placeData.displayName?.text || "Name not available";

                    placeNames.push({
                        place_id: place_id,
                        name: primaryName,
                    });
                } catch (error) {
                    console.error(
                        `Error fetching place details for ${place_id}:`,
                        error
                    );

                    placeNames.push({
                        place_id: place_id,
                        name: "장소 오류",
                    });
                }
            }

            console.log("placeNames:", placeNames);

            this.place_names = placeNames.map(({ place_id, name }) => ({
                id: place_id,
                name: name,
            }));
        },

        getPlaceName(placeId) {
            const place = this.place_names.find((p) => p.id === placeId);
            return place ? place.name : "장소 없음";
        },

        async fetchPhotoData(placeIds) {
            console.log("Photo placeIds:", placeIds);

            const placePhotos = [];

            for (const { place_id } of placeIds) {
                try {
                    console.log(
                        `Fetching details for photoPlaceId: ${place_id}`
                    );

                    const photoResponse = await this.$axios.get(
                        `http://34.64.132.0/api/googlemaps/placeDetails/?format=json&place_id=${place_id}`
                    );

                    const photoData = photoResponse.data;

                    console.log(
                        `Response for Photo place_id ${place_id}:`,
                        photoData
                    );

                    const photoName =
                        photoData.photos?.length > 0
                            ? photoData.photos[0].name
                            : "Photo name not available";

                    placePhotos.push({
                        place_id: place_id,
                        type: photoName,
                    });
                } catch (error) {
                    console.error(
                        `Error fetching place details photo for ${place_id}:`,
                        error
                    );

                    placePhotos.push({
                        place_id: place_id,
                        type: "장소 오류",
                    });
                }
            }

            console.log("placePhotos:", placePhotos);

            if (placePhotos.length > 0) {
                await this.savePhotos(placePhotos);
            }
        },
        async savePhotos(placePhotos) {
            console.log(`Fetching details for placePhotos: ${placePhotos}`);

            const placePhotoUrl = [];

            for (const { place_id, type } of placePhotos) {
                try {
                    if (
                        type === "Photo name not available" ||
                        type === "장소 오류"
                    ) {
                        placePhotoUrl.push({
                            place_id: place_id,
                            url: require("@/assets/icons/logo.png"),
                        });
                        continue;
                    }

                    console.log(`Fetching details for type: ${type}`);

                    const photoResponse = await this.$axios.get(
                        `http://34.64.132.0/api/googlemaps/placePhotos/?place_url=${type}`
                    );

                    const base64Data = photoResponse.data;
                    const photoUrl = `data:image/jpeg;base64,${base64Data}`;

                    placePhotoUrl.push({
                        place_id: place_id,
                        url: photoUrl,
                    });
                } catch (error) {
                    console.error(
                        `Error fetching photo details for ${type}:`,
                        error
                    );

                    placePhotoUrl.push({
                        place_id: place_id,
                        url: require("@/assets/icons/logo.png"),
                    });
                }
            }

            console.log("placePhotoUrl:", placePhotoUrl);

            this.place_photos = placePhotoUrl.map(({ place_id, url }) => ({
                id: place_id,
                url: url,
            }));
        },

        getPlacePhoto(placeId) {
            const photo = this.place_photos.find((p) => p.id === placeId);
            return photo ? photo.url : require("@/assets/icons/logo.png");
        },

        async fetchRouteData(placeIds) {
            console.log("Address placeIds:", placeIds);

            const placeAddress = [];

            for (const { place_id } of placeIds) {
                try {
                    console.log(
                        `Fetching details for addressPlaceId: ${place_id}`
                    );

                    const addressResponse = await this.$axios.get(
                        `http://34.64.132.0/api/googlemaps/placeDetails/?format=json&place_id=${place_id}`
                    );

                    const addressData = addressResponse.data;

                    console.log(
                        `Response for address place_id: ${place_id}:`,
                        addressResponse
                    );

                    const placeFormattedAddress =
                        addressData.formattedAddress || "Address not available";

                    placeAddress.push({
                        place_id: place_id,
                        address: placeFormattedAddress,
                    });
                } catch (error) {
                    console.error(
                        `Error fetching address details for ${place_id}:`,
                        error
                    );

                    placeAddress.push({
                        place_id: place_id,
                        type: "주소 오류",
                    });
                }
            }
            console.log("placeAddress:", placeAddress);

            if (placeAddress.length > 0) {
                await this.saveRoutes(placeAddress);
            }
        },

        async saveRoutes(placeAddress) {
            console.log("Route placeIds:", placeAddress);

            const placeRoutes = [];

            for (let i = 0; i < placeAddress.length; i++) {
                const { place_id, address } = placeAddress[i];
                try {
                    console.log(
                        `Fetching details for routePlaceId: ${address}`
                    );

                    let destination = "";
                    if (i < placeAddress.length - 1) {
                        destination = placeAddress[i + 1].address;
                        console.log(
                            `Fetching details for routeDestination: ${destination}`
                        );
                    } else {
                        continue;
                    }

                    const routeResponse = await this.$axios.get(
                        `http://34.64.132.0/api/googlemaps/placeRoutes/?origin_text=${address}&destination_text=${destination}`
                    );

                    const placeRouteData = routeResponse.data;

                    console.log(
                        `Response for route place_id ${address}:`,
                        placeRouteData
                    );

                    const primaryRoute =
                        placeRouteData[0]?.legs[0]?.steps || [];

                    const filteredPrimaryRoute = primaryRoute.reduce(
                        (acc, current) => {
                            const isEmptyObject =
                                Object.keys(current).length === 0;

                            if (isEmptyObject) {
                                if (
                                    acc.length > 0 &&
                                    Object.keys(acc[acc.length - 1]).length ===
                                        0
                                ) {
                                    return acc;
                                }
                            }

                            acc.push(current);
                            return acc;
                        },
                        []
                    );

                    placeRoutes.push({
                        place_id: place_id,
                        route: filteredPrimaryRoute,
                    });
                } catch (error) {
                    console.error(
                        `Error fetching route details for ${place_id}:`,
                        error
                    );

                    placeRoutes.push({
                        place_id: place_id,
                        route: [""],
                    });
                }
            }

            console.log("placeRoutes:", placeRoutes);

            this.place_routes = placeRoutes.map(({ place_id, route }) => ({
                id: place_id,
                route: route,
            }));
        },

        getPlaceRoute(placeId) {
            const route = this.place_routes.find((p) => p.id === placeId);
            return route ? route.route : "";
        },

        revisePlace_id(place_id, index, detailIndex) {
            this.updatePlaceId(place_id);

            const url = `/SelectDetailPage`;
            const selectDetailPageWindow = window.open(url, "_blank");

            const interval = setInterval(() => {
                if (selectDetailPageWindow.closed) {
                    clearInterval(interval);

                    const revisePlaceIdInfo =
                        localStorage.getItem("revisePlaceIdInfo");
                    console.log("Revise PlaceId Info:", revisePlaceIdInfo);

                    if (revisePlaceIdInfo) {
                        try {
                            const placeInfo = JSON.parse(revisePlaceIdInfo);
                            console.log("Parsed Place Info:", placeInfo);

                            const after = placeInfo.after || "";

                            if (
                                this.cells[index] &&
                                this.cells[index].day[detailIndex]
                            ) {
                                const detail =
                                    this.cells[index].day[detailIndex];
                                console.log(
                                    `Updating place_id at index ${index}-${detailIndex} from '${detail.place_id}' to '${after}'`
                                );
                                detail.place_id = after;

                                localStorage.removeItem("revisePlaceIdInfo");
                                console.log("Updated cells:", this.cells);
                                this.savePlannerPage();
                            } else {
                                console.log(
                                    `No detail found at index ${index}-${detailIndex}`
                                );
                            }
                        } catch (error) {
                            console.error(
                                "Error parsing revisePlaceIdInfo:",
                                error
                            );
                        }
                    } else {
                        console.log(
                            "No revisePlaceIdInfo found in localStorage."
                        );
                    }
                }
            }, 100);
        },

        plusDay() {
            this.cells.push({
                day: [],
            });
        },

        adjustTitleWidth() {
            const inputElement = this.$refs.title;
            const span = document.createElement("span");
            span.textContent = this.title;
            span.style.position = "absolute";
            span.style.visibility = "hidden";
            span.style.whiteSpace = "pre";
            span.style.fontSize = getComputedStyle(inputElement).fontSize;
            span.style.fontFamily = getComputedStyle(inputElement).fontFamily;
            span.style.fontWeight = getComputedStyle(inputElement).fontWeight;
            span.style.fontStyle = getComputedStyle(inputElement).fontStyle;
            span.style.letterSpacing =
                getComputedStyle(inputElement).letterSpacing;
            document.body.appendChild(span);

            const newWidth = span.offsetWidth + 20;
            this.inputTitleWidth = `${Math.max(newWidth, 50)}px`;

            document.body.removeChild(span);
        },

        toggleDayMenu(index) {
            this.activeMenu = this.activeMenu === index ? null : index;
        },

        plannerDay_plusDetail(dayGroup) {
            dayGroup.day.push({
                status: 0,
                place_id: "",
                memo: "",
            });
        },

        plannerDay_delete(index) {
            this.cells.splice(index, 1);
        },

        toggleDetailMenu(index, detailIndex) {
            if (
                this.activeDetailMenu.dayGroup === index &&
                this.activeDetailMenu.detailIndex === detailIndex
            ) {
                this.activeDetailMenu = { dayGroup: null, detailIndex: null };
                this.activeDetailMemo = { dayGroup: null, detailIndex: null };
            } else {
                this.activeDetailMenu = { dayGroup: index, detailIndex };
                this.activeDetailMemo = { dayGroup: null, detailIndex: null };
            }
            console.log("Updated Active Detail Menu:", this.activeDetailMenu);
        },

        plannerdetailMemo(index, detailIndex) {
            if (
                this.activeDetailMemo.dayGroup === index &&
                this.activeDetailMemo.detailIndex === detailIndex
            ) {
                this.activeDetailMemo = { dayGroup: null, detailIndex: null };
            } else {
                this.activeDetailMemo = { dayGroup: index, detailIndex };
            }
            console.log("Updated Active Detail Memo:", this.activeDetailMemo);
        },

        plannerdetailDelete(dayGroup, detailIndex) {
            dayGroup.day.splice(detailIndex, 1);
        },

        toggleDetailRoute(index, detailIndex) {
            if (
                this.activeDetailRoute.dayGroup === index &&
                this.activeDetailRoute.detailIndex === detailIndex
            ) {
                this.activeDetailRoute = { dayGroup: null, detailIndex: null };
            } else {
                this.activeDetailRoute = { dayGroup: index, detailIndex };
            }
            console.log("Updated Active Detail Route:", this.activeDetailRoute);
        },

        async fetchPlannerDetailInfoData(place_id) {
            console.log(`Fetching details for information: ${place_id}`);

            this.selectedDetailPlace = {};

            try {
                console.log(
                    `Fetching details for information place_id: ${place_id}`
                );

                const infoResponse = await this.$axios.get(
                    `http://34.64.132.0/api/googlemaps/placeDetails/?format=json&place_id=${place_id}`
                );

                const infoData = infoResponse.data;

                this.selectedDetailPlace.name = this.getPlaceName(place_id);

                this.selectedDetailPlace.rating =
                    infoData.rating || "평점 없음";

                this.selectedDetailPlace.address =
                    infoData.formattedAddress || "주소 없음";

                this.selectedDetailPlace.internationalPhoneNum =
                    infoData.internationalPhoneNumber || "전화번호 없음";

                this.selectedDetailPlace.websiteUri =
                    infoData.websiteUri || "웹사이트 링크 없음";

                this.selectedDetailPlace.reviews = (infoData.reviews || []).map(
                    (review) => {
                        return {
                            author: review.authorAttribution.displayName,
                            rating: review.rating,
                            text:
                                review.originalText?.text || review.text?.text,
                        };
                    }
                );

                console.log(
                    `SelectedDetailPlace set: ${JSON.stringify(
                        this.selectedDetailPlace
                    )}`
                );
            } catch (error) {
                console.error(
                    `Error fetching place details for ${place_id}:`,
                    error
                );
                this.selectedDetailPlace.rating = "평점 정보 오류";

                this.selectedDetailPlace.address = "주소 정보 오류";

                this.selectedDetailPlace.internationalPhoneNum =
                    "전화번호 정보 오류";

                this.selectedDetailPlace.websiteUri = "웹사이트 링크 정보 오류";

                this.selectedDetailPlace.reviews = "리뷰 정보 오류";
            }
        },

        async savePlannerPage() {
            try {
                this.cells.forEach((day) => {
                    day.day.forEach((item) => {
                        if (item.place_id !== "") {
                            item.status = 1;
                        }
                    });
                });

                const plannerData = {
                    user_id: this.user_id,
                    title: this.title,
                    cells: this.cells,
                };

                console.log("readying data:", plannerData);

                const response = await fetch(
                    `http://34.64.132.0/api/planners/${this.planner_id}/update/`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify(plannerData),
                    }
                );

                console.log(
                    "Sending JSONdata:",
                    JSON.stringify(plannerData, null, 2)
                );

                const responseData = await response.json();
                console.log("Response Data:", responseData);

                alert("저장이 완료되었습니다.");
                this.fetchPlannerData(this.planner_id);
            } catch (error) {
                console.error(
                    "Error saving planner data:",
                    error.response?.data || error.message
                );
            }
        },

        handleBeforeUnload(event) {
            const message =
                "변경 사항이 저장되지 않을 수 있습니다. 정말로 떠나시겠습니까?";
            event.returnValue = message;
            return message;
        },
    },
    mounted() {
        window.addEventListener("beforeunload", this.handleBeforeUnload);

        const queryParams = new URLSearchParams(window.location.search);

        this.planner_id = queryParams.get("planner_id");
        this.fetchPlannerData(this.planner_id);
    },
    beforeUnmount() {
        window.removeEventListener("beforeunload", this.handleBeforeUnload);
    },
    beforeRouteLeave(to, from, next) {
        const message =
            "변경 사항이 저장되지 않을 수 있습니다. 정말로 떠나시겠습니까?";

        const answer = window.confirm(message);
        if (answer) {
            next();
        } else {
            next(false);
        }
    },
};
</script>

<style>
/* 플래너 구성요소 박스 css */
.plannerPlanBox {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 60px;
}

.plannerPlanBox .planContainer {
    display: flex;
    flex-direction: column;
    flex: 2;
    align-items: flex-start;
    margin-top: 40px;
    margin-left: 350px;
}

.plannerPlanTopBox {
    display: flex;
    align-items: center;
    gap: 20px;
}

/* 플래너페이지 스크롤스파이 박스 css */
.plannerPlanScrollspyBox {
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
    flex: 1;
    height: 100vh;
    position: fixed;
    top: 0;
    width: 250px;
    overflow: hidden;
}

.plannerPlanScrollspyHeader {
    margin-top: 100px;
}

.plannerPlanScrollspyBox .col-4 {
    width: 250px;
    margin-top: 30px;
    font-size: 23px;
    overflow: auto;
    height: 70%;
}

.plannerPlanScrollspyBox .col-4 a {
    color: black;
    text-decoration: none;
}

.plannerPlanScrollspyBox .col-4 a:hover {
    color: rgba(54, 212, 222, 1);
}

/* 플래너페이지 데이추가 버튼 css */
.plannerPlanScrollspyBox .plusDayButton {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    width: 120px;
}

.plannerPlanScrollspyBox .plusDayButton:hover {
    background-color: #f2f2f2;
}

/* 플래너페이지 input 여행제목 css */
.plannerPlanInputTitle {
    font-size: 50px;
    border: 1px solid;
    border-radius: 5px;
}

.plannerPlanInputTitle::placeholder {
    color: black;
}

/* 플래너 프린트 이미지 css  */
.printImgBtn img {
    width: 60px;
    height: 60px;
}

/* 플래너 정보창 css */
.planContainer .scrollspy-example {
    overflow: visible;
}

.PlannerPlanInformationBox {
    text-align: left;
    width: 900px;
    box-sizing: border-box;
}

/* 플래너 데이 칸 css */
.PlannerPlanInformationBox .plannerDayBox {
    background: linear-gradient(to top right, #d4f1f9, #ffffff);
    border: 2px solid;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
}

.plannerDayBox .plannerDayMenuBtn {
    padding-top: 20px;
    width: 32px;
}

.PlannerPlanInformationBox .plannerDayFont {
    font-size: 38px;
    font-weight: bold;
}
/* 플래너 데이 메뉴바 css */
.plannerDayMenuBar {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid;
    border-radius: 3px;
    position: absolute;
    left: 1090px;
}

/* 플래너 데이 메뉴바 말풍선 css */
.plannerDayMenuBar:after {
    content: "";
    position: absolute;
    border-top: 10px solid transparent;
    border-left: 10px solid #484848;
    border-right: 0px solid transparent;
    border-bottom: 10px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
}

.plannerDayMenu_plusDetailBoxBtn {
    width: 40px;
}

.plannerDayMenu_deleteBtn {
    width: 45px;
}

/* 플래너 세부사항 칸 css */
.PlannerPlanInformationBox .plannerDetailBox {
    border: 1px solid;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
}

.plannerDetailBox .placeBox {
    display: flex;
    gap: 25px;
}

.plannerDetailBox .place_photoImg {
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.plannerDetailMenuBtn button img {
    width: 35px;
}

.detailToggleBtnBox {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.plannerdetailRouteBtn img {
    height: 26px;
}

/* 플래너 세부사항 메뉴바 css */
.plannerDetailBtnBar {
    background-color: white;
    display: flex;
    align-items: center;
    gap: 20px;
    border: 2px solid;
    border-radius: 3px;
    position: absolute;
    left: 1042px;
}

/* 플래너 세부사항 메뉴바 말풍선 css */
.plannerDetailBtnBar:after {
    content: "";
    position: absolute;
    border-top: 10px solid transparent;
    border-left: 10px solid #484848;
    border-right: 0px solid transparent;
    border-bottom: 10px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    right: -10px;
}

.PlannerPlanInformationBox .plannerDetatilFont {
    font-size: 25px;
}

.plannerDetailBox .plannerdetailMemoBtn {
    width: 33px;
}

.plannerDetailBox .plannerdetailDeleteBtn {
    width: 43px;
}

.plannerDetailBox .plannerdetailInfoBtn {
    width: 35px;
}

/* 플래너 세부사항 메모바 css */
.plannerDetailMemoBar {
    background-color: white;
    display: flex;
    align-items: center;
    border: 7px solid;
    border-radius: 3px;
    position: absolute;
    left: 955px;
    font-size: 23px;
}

/* 플래너 세부사항 메모바 말풍선 css */
.plannerDetailMemoBar:after {
    content: "";
    position: absolute;
    border-top: px solid transparent;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid #484848;
    top: -30px;
    left: 56%;
    transform: translateX(-50%);
}

/* 세부사항 사이 루트 css */
.placeRouteBox {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-left: 20px;
}

.route_item {
    display: flex;
    align-items: center;
    font-size: 15px;
}

#connectRouteLineImg {
    width: 100px;
    height: 30px;
}

#connectRouteTransferImg {
    width: 100px;
    height: 50px;
}

.route_details {
    display: flex;
    flex-direction: column;
}

.route_details #routeLocationFont {
    color: rgba(54, 212, 222, 1);
    font-weight: bold;
}

.route_details div {
    padding: 5px 10px;
}

/* 오프 캔버스 css */
.detailInfoOffcanvas {
    border-radius: 5px solid !important;
}

.detailInfoOffcanvas .offcanvas-header .btn-close {
    position: absolute;
    top: 10px;
    right: 375px;
}

.detailInfoOffcanvas .offcanvas-header {
    background-color: lightblue;
    border: 3px solid;
    border-bottom: none;
}

.detailInfoOffcanvas .offcanvas-header div p {
    float: left;
    margin-left: 20px;
}

.detailInfoOffcanvas .offcanvasHeaderHr {
    height: 20px;
    margin: 0px;
    background-color: black;
}

.detailInfoOffcanvas .offcanvas-body {
    float: left;
    padding-left: 10px;
    font-size: 20px;
    border: 3px solid;
    border-top: none;
}

.detailInfoOffcanvas .offcanvas-body p span {
    display: block;
    font-size: 17px;
}

/* 플래너 저장 Btn css */
.plannerSaveBtnBox {
    display: flex;
    position: fixed;
    bottom: 15px;
    right: 40px;
    box-sizing: border-box;
}
.plannerSaveBtnBox button {
    background-color: rgba(54, 212, 222, 1);
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 25px;
    width: 120px;
}
.plannerSaveBtnBox button:hover {
    background-color: #f2f2f2;
}
</style>
