import { trigger, animate, transition, style, query, AnimationTriggerMetadata } from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata =

    trigger('fadeAnimation', [

        transition( '* => *', [

            query(':enter',
                [
                    style({ opacity: 0, position: 'absolute'})
                ],
                { optional: true }
            ),

            query(':leave',
                [
                    style({ opacity: 1, position: 'absolute'}),
                    animate('0.5s', style({ opacity: 0 }))
                ],
                { optional: true }
            ),

            query(':enter',
                [
                    style({ opacity: 0 , position: 'absolute'}),
                    animate('0.5s', style({ opacity: 1}))
                ],
                { optional: true }
            )

        ])

    ]);
