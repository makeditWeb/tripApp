// 드롭다운
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function selectOption(option) {
    document.querySelector('.dropdown-text').textContent = option;
    document.getElementById("myDropdown").classList.remove("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-header') && !event.target.matches('.dropdown-text') && !event.target.matches('.dropdown-arrow')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// 좋아요 버튼 기능
function initLikeButton() {
    const likeBtn = document.querySelector('.like_btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            const heartPath = this.querySelector('path');
            if (heartPath) {
                if (heartPath.getAttribute('fill') === 'white') {
                    // 좋아요 활성화
                    heartPath.setAttribute('fill', '#FF5757');
                    heartPath.setAttribute('stroke', '#FF5757');
                } else {
                    // 좋아요 비활성화
                    heartPath.setAttribute('fill', 'white');
                    heartPath.setAttribute('stroke', '#484C52');
                }
            }
        });
    }
}

// 게시물 상세 보기 관련 기능
function showPostDetail(imageSrc) {
    // 이미지 그리드 숨기기
    document.querySelector('.image-grid').style.display = 'none';
    
    // 상세 페이지 표시
    const postDetail = document.getElementById('postDetail');
    postDetail.style.display = 'block';
    
    // 메인 슬라이더 초기화
    initMainSlider();
    
    // 추천 게시물 슬라이더 초기화 (하단 슬라이더)
    initRecommendationSlider();

    // 더보기 버튼 이벤트 리스너 다시 등록
    initMoreButton();

    // 좋아요 버튼 초기화
    initLikeButton();
}

// 텍스트 더보기 기능
function initMoreButton() {
    const moreBtn = document.querySelector('.post-detail .more-btn');
    const textContent = document.querySelector('.post-detail .text-content');
    const fullText = document.querySelector('.post-detail .full-text');
    
    if (moreBtn && textContent && fullText) {
        moreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            textContent.style.display = 'none';
            fullText.style.display = 'block';
        });
    }
}

// 메인 슬라이더 초기화 (게시물 이미지)
function initMainSlider() {
    new Swiper('.main_slide', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

// 추천 게시물 슬라이더 초기화 (하단 슬라이더)
function initRecommendationSlider() {
    const recommendationSliderHTML = `
        <div class="swiper recommendation_slide">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="../assets/images/post_list01.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list02.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list03.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list02.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list01.png">
                </div>
                <div class="swiper-slide">
                    <img src="../assets/images/post_list03.png">
                </div>                
            </div>
            <div class="swiper-pagination"></div>
        </div>
    `;
    
    document.querySelector('.post-content').insertAdjacentHTML('beforeend', recommendationSliderHTML);
    
    new Swiper('.recommendation_slide', {
        slidesPerView: 2.8,
        spaceBetween: 10,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}

// 뒤로가기 기능
function goBack() {
    document.querySelector('.image-grid').style.display = 'grid';
    document.getElementById('postDetail').style.display = 'none';
    
    // 추천 슬라이더 제거
    const recommendationSlide = document.querySelector('.recommendation_slide');
    if (recommendationSlide) {
        recommendationSlide.remove();
    }

    // 텍스트 상태 초기화
    const textContent = document.querySelector('.post-detail .text-content');
    const fullText = document.querySelector('.post-detail .full-text');
    if (textContent && fullText) {
        textContent.style.display = 'block';
        fullText.style.display = 'none';
    }
}

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .text-content {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
    }
    
    .full-text {
        display: none;
        margin-bottom: 10px;
    }
    
    .more-btn {
        color: #666;
        cursor: pointer;
        display: inline-block;
        margin-left: 4px;
    }
    
    .more-btn:hover {
        text-decoration: underline;
    }
    
    .recommendation_slide {
        margin-top: 20px;
    }
    
    .recommendation_slide .swiper-slide {
        width: 150px;
    }
    
    .recommendation_slide img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }

    /* Pagination bullet styles */
    .swiper-pagination-bullet {
        width: 5px;
        height: 5px;
        border-radius: 30px;
        transition: all 0.3s ease;
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
        width: 28px;
        border-radius: 30px;
        height: 5px;
    }

    /* 좋아요 버튼 스타일 */
    .like_btn {
        cursor: pointer;
        transition: transform 0.2s ease;
    }
    
    .like_btn:hover {
        transform: scale(1.1);
    }
    
    .like_btn:active {
        transform: scale(0.95);
    }

    /* 액션 아이콘들의 공통 스타일 */
    .action-icons {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 10px 0;
    }

    .action-icons a, 
    .action-icons div {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

document.head.appendChild(style);

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    initMoreButton();
    initLikeButton();
});






// 검색 페이지 탭

$(document).ready(function(){
	
	$('ul.tab-list li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tab-list li').removeClass('active');
		$('.tab-content').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})

})



// chat
document.addEventListener('DOMContentLoaded', function() {
    // 뒤로가기 버튼 기능 - 공통
    const backBtn = document.querySelector('.back_btn');
    if(backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }

    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabType = this.getAttribute('data-tab');
            
            // 페이지 이동
            if(tabType === 'chat') {
                window.location.href = 'chatroom.html';
            } else if(tabType === 'openchat') {
                window.location.href = 'openchat.html';
            }
        });
    });

    // menu_dots 클릭 이벤트 - 공통
    const menuDots = document.querySelector('.menu_dots svg');
    if(menuDots) {
        // URL이나 클래스를 체크하여 개인채팅/오픈채팅 구분
        const isOpenChat = document.querySelector('.openchat_container_list') !== null;
        
        if(isOpenChat) {
            // 오픈챗 사이드 메뉴 기능
            const sideMenu = document.querySelector('.side_menu');
            const menuOverlay = document.querySelector('.menu_overlay');
            const manageBtn = document.querySelector('.manage_btn');
            const openChatSetting = document.querySelector('.openChat_setting');
            const settingCloseBtn = document.querySelector('.openChat_setting .close_btn');

            menuDots.addEventListener('click', function(e) {
                e.stopPropagation();
                sideMenu.classList.add('active');
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            if(menuOverlay) {
                menuOverlay.addEventListener('click', closeMenu);
            }

            // 오른쪽으로 스와이프하여 메뉴 닫기
            if(sideMenu) {
                let touchStartX = 0;
                let touchEndX = 0;

                sideMenu.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                }, false);

                sideMenu.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    if (touchEndX > touchStartX) {
                        closeMenu();
                    }
                }, false);
            }

            // 관리 버튼 클릭 이벤트
            if(manageBtn) {
                manageBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    openChatSetting.classList.add('active');
                    // side menu 닫기
                    closeMenu();
                });
            }

            // 설정 닫기 버튼 이벤트
            if(settingCloseBtn) {
                settingCloseBtn.addEventListener('click', function() {
                    openChatSetting.classList.remove('active');
                });
            }

            function closeMenu() {
                sideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }

        } else {
            // 개인채팅 드롭다운 메뉴 기능
            const dropdownMenu = document.querySelector('.dropdown_menu');
            let isDropdownOpen = false;

            menuDots.addEventListener('click', function(e) {
                e.stopPropagation();
                isDropdownOpen = !isDropdownOpen;
                dropdownMenu.classList.toggle('active');
            });

            const menuItems = document.querySelectorAll('.menu_item');
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const action = this.textContent;
                    console.log('Selected action:', action);
                    dropdownMenu.classList.remove('active');
                    isDropdownOpen = false;
                });
            });

            document.addEventListener('click', function(e) {
                if (isDropdownOpen && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                    isDropdownOpen = false;
                }
            });
        }
    }

    // 설정 토글 스위치 기능
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    if(toggleSwitches) {
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', function() {
                console.log('Toggle switched:', this.checked);
                // 여기에 토글 상태 변경에 따른 추가 로직 구현
            });
        });
    }

    // 최대 인원수 입력 제한
    const memberCountInput = document.querySelector('.number_input input');
    if(memberCountInput) {
        memberCountInput.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (value > 100) this.value = 100; // 최대값 제한
            if (value < 1) this.value = 1; // 최소값 제한
        });
    }
});