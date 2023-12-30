import { NextResponse } from "next/server";
import getCurrentUser from "/app/actions/getCurrentUser";
import prisma from "/app/libs/prismadb";

interface IPramas {
    listingId?: string;

}

export async function POST(
    request: Request,
    { params }: { params: IPramas }
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId } = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid listingId");
    }

    let favouriteIds = [...(currentUser.favouriteId || [])];

    favouriteIds.push(listingId);

    console.log(favouriteIds);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteId : favouriteIds
        }
    });

    return NextResponse.json(user);
}


export async function DELETE(
    request: Request,
    { params }: { params: IPramas }
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }


    const { listingId } = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid listingId");
    }

    let favouriteIds = [...(currentUser.favouriteId || [])];

    favouriteIds = favouriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favouriteId: favouriteIds
        }
    });

    return NextResponse.json(user);
}