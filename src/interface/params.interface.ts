export interface ITwitterApiFollowParams{
    count?: number;
    user_id?: number | string;
    screen_name?: string;
    cursor?: number | string;
    skip_status?: boolean;
    include_user_entities?: boolean;
}

interface ITwitterApiTimeLineBaseParams{
    count?: number;
    since_id?: number | string;
    max_id?: number | string;
    trim_user?: boolean;
    exclude_replies?: boolean;
    tweet_mode?: 'extended'
}

export interface ITwitterApiTimeLineParams extends ITwitterApiTimeLineBaseParams{
    include_entities?: boolean;
}

export interface ITwitterApiUserTimeLineParams extends ITwitterApiTimeLineBaseParams{
    user_id?: number | string;
    screen_name?: number | string;
    include_rts?: boolean;
}