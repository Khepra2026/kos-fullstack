from fastapi import APIRouter
router=APIRouter(prefix="/api/paydunya")
@router.post("/initiate")
def pay(amount:float,email:str):
 return {"url":f"https://paydunya.com/{amount}","mock":True}
