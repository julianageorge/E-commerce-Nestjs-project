import { AuthGuard } from "@common/guard/auth.guard"
import { RolesGuard } from "@common/guard/roles.guard"
import { applyDecorators, UseGuards } from "@nestjs/common"
import { Roles } from "./role.decorator"

export const Auth=(role:string[])=>{
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard,RolesGuard),
    )
}