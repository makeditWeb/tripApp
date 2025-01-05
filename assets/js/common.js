function initMap() {
    const seoulCoords = { lat: 37.5665, lng: 126.9780 };
    const geocoder = new google.maps.Geocoder();
    
    // postMap 초기화 (postMap 요소가 있을 경우에만)
    const postMapElement = document.getElementById('postMap');
    if (postMapElement) {
        const map = new google.maps.Map(postMapElement, {
            center: seoulCoords,
            zoom: 17,
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: seoulCoords,
            map: map,
            title: '서울'
        });

        // 지도의 중심이 변경될 때마다 주소 업데이트
        map.addListener('center_changed', _.debounce(() => {
            const center = map.getCenter();
            updateAddress(geocoder, center);
        }, 300));

        // 초기 주소 설정
        updateAddress(geocoder, seoulCoords);
    }

    // writeMap 초기화 (writeMap 요소가 있을 경우에만)
    const writeMapElement = document.getElementById('writeMap');
    if (writeMapElement) {
        const writeMap = new google.maps.Map(writeMapElement, {
            center: seoulCoords,
            zoom: 17,
            disableDefaultUI: true,
            styles: [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });

        const writeMarker = new google.maps.marker.AdvancedMarkerElement({
            position: seoulCoords,
            map: writeMap,
            title: '서울'
        });
    }
}

function updateAddress(geocoder, latLng) {
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById('current-address').textContent = results[0].formatted_address;
            }
        }
    });
}

// 바텀시트 초기화 함수
function initializeBottomSheet() {
    const bottomSheet = document.getElementById('bottomSheet');
    const handleBar = document.getElementById('handleBar');

    if (!bottomSheet || !handleBar) return;

    let startY;
    let startHeight;
    let isDragging = false;

    const BOTTOM_NAV_HEIGHT = 60;
    const SHEET_POSITIONS = {
        EXPANDED: 80,
        DEFAULT: 45,
        COLLAPSED: 15
    };

    function calculateActualHeight(percentage) {
        return (window.innerHeight - BOTTOM_NAV_HEIGHT) * (percentage / 100);
    }

    function setSheetHeight(percentage) {
        const actualHeight = calculateActualHeight(percentage);
        bottomSheet.style.height = `${actualHeight}px`;
    }

    setSheetHeight(SHEET_POSITIONS.DEFAULT);

    function startDragging(e) {
        isDragging = true;
        startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        startHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
        bottomSheet.style.transition = 'none';
        handleBar.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        const walk = startY - y;
        const newHeight = startHeight + walk;
        const availableHeight = window.innerHeight - BOTTOM_NAV_HEIGHT;
        const heightPercentage = (newHeight / availableHeight) * 100;
        
        if (heightPercentage >= SHEET_POSITIONS.COLLAPSED && 
            heightPercentage <= SHEET_POSITIONS.EXPANDED) {
            bottomSheet.style.height = `${newHeight}px`;
        }
    }

    function stopDragging() {
        if (!isDragging) return;
        isDragging = false;
        handleBar.style.cursor = 'grab';
        bottomSheet.style.transition = 'height 0.3s ease-out';
        
        const availableHeight = window.innerHeight - BOTTOM_NAV_HEIGHT;
        const currentHeight = parseInt(getComputedStyle(bottomSheet).height, 10);
        const currentPercentage = (currentHeight / availableHeight) * 100;
        
        if (currentPercentage < 30) {
            setSheetHeight(SHEET_POSITIONS.COLLAPSED);
        } else if (currentPercentage > 60) {
            setSheetHeight(SHEET_POSITIONS.EXPANDED);
        } else {
            setSheetHeight(SHEET_POSITIONS.DEFAULT);
        }
    }

    handleBar.addEventListener('mousedown', startDragging);
    handleBar.addEventListener('touchstart', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    window.addEventListener('resize', () => {
        const currentPercentage = parseInt(bottomSheet.style.height) / 
            (window.innerHeight - BOTTOM_NAV_HEIGHT) * 100;
        setSheetHeight(currentPercentage);
    });
}

// DOM 로드 및 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    initializeBottomSheet();
});

document.addEventListener('bottomSheetInit', () => {
    initializeBottomSheet();
});