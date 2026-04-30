import pytest
from httpx import AsyncClient

ENDPOINT = "/api/v1/merchants"

VALID_MERCHANT = {
    "business_name": "Test Corp",
    "business_type": "Retail",
    "mcc_code": 5411,
    "full_name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1-555-0100",
}


@pytest.mark.asyncio
async def test_create_merchant_success(client: AsyncClient):
    response = await client.post(ENDPOINT, json=VALID_MERCHANT)
    assert response.status_code == 201
    data = response.json()
    assert data["business_name"] == "Test Corp"
    assert data["email"] == "jane@example.com"
    assert data["status"] == "pending"
    assert "id" in data
    assert "created_at" in data


@pytest.mark.asyncio
async def test_create_merchant_missing_field(client: AsyncClient):
    payload = {**VALID_MERCHANT}
    del payload["email"]
    response = await client.post(ENDPOINT, json=payload)
    assert response.status_code == 422
    body = response.json()
    assert body["error"]["code"] == "VALIDATION_ERROR"


@pytest.mark.asyncio
async def test_create_merchant_invalid_mcc_too_low(client: AsyncClient):
    payload = {**VALID_MERCHANT, "mcc_code": 99, "email": "low@example.com"}
    response = await client.post(ENDPOINT, json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_merchant_invalid_mcc_too_high(client: AsyncClient):
    payload = {**VALID_MERCHANT, "mcc_code": 10000, "email": "high@example.com"}
    response = await client.post(ENDPOINT, json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_merchant_invalid_email(client: AsyncClient):
    payload = {**VALID_MERCHANT, "email": "not-an-email"}
    response = await client.post(ENDPOINT, json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_merchant_invalid_phone(client: AsyncClient):
    payload = {**VALID_MERCHANT, "email": "phone@example.com", "phone": "123"}
    response = await client.post(ENDPOINT, json=payload)
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_create_merchant_duplicate_email(client: AsyncClient):
    await client.post(ENDPOINT, json=VALID_MERCHANT)
    response = await client.post(ENDPOINT, json=VALID_MERCHANT)
    assert response.status_code == 409
    body = response.json()
    assert body["error"]["code"] == "CONFLICT"


@pytest.mark.asyncio
async def test_list_merchants_empty(client: AsyncClient):
    response = await client.get(ENDPOINT)
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 0
    assert data["items"] == []
    assert data["has_more"] is False


@pytest.mark.asyncio
async def test_list_merchants_with_pagination(client: AsyncClient):
    for i in range(3):
        payload = {**VALID_MERCHANT, "email": f"user{i}@example.com"}
        await client.post(ENDPOINT, json=payload)

    response = await client.get(ENDPOINT, params={"limit": 2, "offset": 0})
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 3
    assert len(data["items"]) == 2
    assert data["has_more"] is True


@pytest.mark.asyncio
async def test_get_merchant_by_id(client: AsyncClient):
    create_response = await client.post(ENDPOINT, json=VALID_MERCHANT)
    merchant_id = create_response.json()["id"]

    response = await client.get(f"{ENDPOINT}/{merchant_id}")
    assert response.status_code == 200
    assert response.json()["id"] == merchant_id


@pytest.mark.asyncio
async def test_get_merchant_not_found(client: AsyncClient):
    response = await client.get(f"{ENDPOINT}/00000000-0000-0000-0000-000000000000")
    assert response.status_code == 404
    body = response.json()
    assert body["error"]["code"] == "NOT_FOUND"
