// 공통 초기화 함수
function initCommonElements() {
    // 뒤로가기 버튼 초기화
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.back();
        });
    }
}

// password toggle
document.addEventListener('DOMContentLoaded', function() {
    // 공통 요소 초기화
    initCommonElements();

    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.toggle-password');
    const eyeIcon = toggleButton.querySelector('.eye-icon');
    let passwordVisible = false;

    toggleButton.addEventListener('click', function() {
        passwordVisible = !passwordVisible;
        
        // 비밀번호 input type 변경
        passwordInput.type = passwordVisible ? 'text' : 'password';
        
        // 아이콘 이미지 변경
        eyeIcon.src = passwordVisible ? '../../assets/images/visibility_off.svg' : '../../assets/images/visibility.svg';
    });
});

// register 유효성
document.addEventListener('DOMContentLoaded', function() {
// 공통 요소 초기화
    initCommonElements();

    const registerForm = document.getElementById('registerForm');

    // 입력 필드 유효성 검사 함수
    function validateField(field, errorElement) {
        const fieldGroup = field.closest('.input-group');
        
        if (!field.value.trim()) {
            fieldGroup.classList.add('error');
            errorElement.textContent = '이 입력란을 작성하세요.';
            return false;
        } else {
            fieldGroup.classList.remove('error');
            errorElement.textContent = '';
            return true;
        }
    }

    // 비밀번호 일치 여부 확인 함수
    function validatePasswords() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const passwordError = document.getElementById('passwordError');
        const confirmGroup = confirmPassword.closest('.input-group');

        if (confirmPassword.value && password.value !== confirmPassword.value) {
            confirmGroup.classList.add('error');
            passwordError.textContent = '비밀번호가 일치하지 않습니다.';
            return false;
        } else {
            confirmGroup.classList.remove('error');
            passwordError.textContent = '';
            return true;
        }
    }

    // 실시간 비밀번호 확인
    const confirmPassword = document.getElementById('confirmPassword');
    confirmPassword.addEventListener('input', validatePasswords);

    // 폼 제출 처리
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 모든 필드 검사
            const username = document.getElementById('username');
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            const isUsernameValid = validateField(username, document.getElementById('usernameError'));
            const isEmailValid = validateField(email, document.getElementById('emailError'));
            const isPasswordValid = validateField(password, document.getElementById('mainPasswordError'));
            const isConfirmPasswordValid = validateField(confirmPassword, document.getElementById('passwordError'));
            const doPasswordsMatch = validatePasswords();

            // 모든 검사가 통과되면 폼 제출
            if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && doPasswordsMatch) {
                console.log('폼 제출 성공');
                window.location.href = './questions.html';
            }
        });
    }
});

// questions 생년월일/시티
document.addEventListener('DOMContentLoaded', function() {
    // 공통 요소 초기화
    initCommonElements();

    const form = document.getElementById('questionsForm');
    const birthYearSelect = document.getElementById('birthYear');
    const citySelect = document.getElementById('city');
    const skipBtn = document.getElementById('skipBtn');

    // 생년월일 옵션 생성
    function populateBirthYears() {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 100;
        
        birthYearSelect.innerHTML = ''; // 기존 옵션 제거
        
        // 기본 옵션 추가
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select year";
        defaultOption.disabled = true;
        birthYearSelect.appendChild(defaultOption);
        
        for (let year = currentYear; year >= startYear; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === 1993) {
                option.selected = true;
            }
            birthYearSelect.appendChild(option);
        }
    }

    // 국가 데이터 가져오기
    async function fetchCountries() {
        try {
            citySelect.innerHTML = ''; 
            
            // 로딩 옵션 추가
            const loadingOption = document.createElement('option');
            loadingOption.textContent = "Loading...";
            loadingOption.disabled = true;
            loadingOption.selected = true;
            citySelect.appendChild(loadingOption);

            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();

            citySelect.innerHTML = '';
            
            const defaultOption = document.createElement('option');
            defaultOption.value = "";
            defaultOption.textContent = "Select country";
            defaultOption.disabled = true;
            citySelect.appendChild(defaultOption);

            countries
                .map(country => ({
                    name: country.name.common,
                    official: country.name.official
                }))
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.name;
                    option.textContent = country.name;
                    if (country.name === "Republic of Korea") {
                        option.selected = true;
                    }
                    citySelect.appendChild(option);
                });
        } catch (error) {
            console.error('Failed to fetch countries:', error);
            citySelect.innerHTML = '<option value="" disabled selected>Failed to load countries</option>';
        }
    }

    // 폼 유효성 검사
    function validateForm() {
        let isValid = true;
        
        if (!birthYearSelect.value) {
            const birthYearError = document.getElementById('birthYearError');
            if (birthYearError) {
                birthYearError.textContent = '생년월일을 선택해주세요.';
            }
            birthYearSelect.closest('.input-group').classList.add('error');
            isValid = false;
        } else {
            const birthYearError = document.getElementById('birthYearError');
            if (birthYearError) {
                birthYearError.textContent = '';
            }
            birthYearSelect.closest('.input-group').classList.remove('error');
        }

        if (!citySelect.value) {
            const cityError = document.getElementById('cityError');
            if (cityError) {
                cityError.textContent = '국가를 선택해주세요.';
            }
            citySelect.closest('.input-group').classList.add('error');
            isValid = false;
        } else {
            const cityError = document.getElementById('cityError');
            if (cityError) {
                cityError.textContent = '';
            }
            citySelect.closest('.input-group').classList.remove('error');
        }

        return isValid;
    }

    // 초기화 함수
    function init() {
        if (birthYearSelect) {
            populateBirthYears();
        }

        if (citySelect) {
            fetchCountries();
        }

        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    console.log('Form submitted:', {
                        birthYear: birthYearSelect.value,
                        country: citySelect.value
                    });
                    window.location.href = '../../pages/index.html';
                }
            });
        }

        if (skipBtn) {
            skipBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Skipped');
                window.location.href = '../../pages/index.html';
            });
        }

        birthYearSelect?.addEventListener('change', function() {
            this.closest('.input-group').classList.remove('error');
            const error = document.getElementById('birthYearError');
            if (error) error.textContent = '';
        });

        citySelect?.addEventListener('change', function() {
            this.closest('.input-group').classList.remove('error');
            const error = document.getElementById('cityError');
            if (error) error.textContent = '';
        });
    }

    init();
});

// 이메일 코드 입력
document.addEventListener('DOMContentLoaded', function() {
    // 공통 요소 초기화
    initCommonElements();

    const form = document.getElementById('verificationForm');
    const inputs = document.querySelectorAll('.code-input');
    const TEMP_VERIFY_CODE = "5130"; // 임시 인증번호

    // 에러 메시지 요소 생성
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    form.querySelector('.btn_wrap').insertBefore(errorMessage, form.querySelector('.btn_wrap button'));

    function showError(message) {
        inputs.forEach(input => {
            input.classList.add('error');
        });
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function clearError() {
        inputs.forEach(input => {
            input.classList.remove('error');
        });
        errorMessage.style.display = 'none';
    }

    // 입력 필드 자동 포커스 이동
    inputs.forEach((input, index) => {
        input.addEventListener('keyup', function(e) {
            clearError();
            
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                inputs[index - 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = e.clipboardData.getData('text');
            const numbers = pastedText.match(/\d/g);
            
            if (numbers) {
                inputs.forEach((input, i) => {
                    if (numbers[i]) {
                        input.value = numbers[i];
                    }
                });
                if (inputs[inputs.length - 1]) {
                    inputs[inputs.length - 1].focus();
                }
            }
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const code = Array.from(inputs).map(input => input.value).join('');
        
        if (code.length !== 4) {
            showError('인증번호 4자리를 입력해주세요.');
            return;
        }

        if (code === TEMP_VERIFY_CODE) {
            console.log('Verification successful');
            window.location.href = './create_password.html';
        } else {
            showError('코드를 다시 입력해주세요.');
            inputs.forEach(input => {
                input.value = '';
            });
            inputs[0].focus();
        }
    });
});

// 비밀번호 새로 만들기
document.addEventListener('DOMContentLoaded', function() {
    // 공통 요소 초기화
    initCommonElements();

    const form = document.getElementById('createForm');
    const newPassword = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    form.querySelector('.btn_wrap').insertBefore(errorMessage, form.querySelector('.btn_wrap button'));

    function showError(message) {
        newPassword.classList.add('error');
        confirmPassword.classList.add('error');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function clearError() {
        newPassword.classList.remove('error');
        confirmPassword.classList.remove('error');
        errorMessage.style.display = 'none';
    }

    [newPassword, confirmPassword].forEach(input => {
        input.addEventListener('input', clearError);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!newPassword.value || !confirmPassword.value) {
            showError('비밀번호를 입력해주세요.');
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            showError('비밀번호가 일치하지 않습니다.');
            confirmPassword.value = '';
            confirmPassword.focus();
            return;
        }

        window.location.href = './login.html';
    });
});