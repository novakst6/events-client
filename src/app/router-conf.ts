import { Routes } from '@angular/router'
import { CreateComponent } from './event/create/create.component'
import { EditComponent } from './event/edit/edit.component'
import { ListComponent } from './event/list/list.component'

export const AppRoutes : Routes = [
    {
        path: 'create',
        component: CreateComponent
    },
    {
        path: 'edit/:id',
        component: EditComponent
    },
    {
        path: '',
        component: ListComponent
    }
]