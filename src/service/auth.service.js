export async function loginService(formData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auths/login`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok && data.payload) {
      return data.payload;
    }
    return null;
  } catch (error) {
    console.error("Login Service Error:", error);
    return null;
  }
}

export async function registerService(formData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auths/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        data: data.payload,
      };
    }
    return {
      success: false,
      message: data.detail || "Registration failed",
      errors: data.errors || null,
    };
  } catch (error) {
    console.error("Register Service Error:", error);
    return {
      success: false,
    };
  }
}

