export interface ITwitterApiFollowParams{
    count?: number;
    user_id?: number | string;
    screen_name?: string;
    cursor?: number | string;
    skip_status?: boolean;
    include_user_entities?: boolean;
}

export interface ITwitterApiTimeLineParams{
    count?: number;
    since_id?: number | string;
    max_id?: number | string;
    trim_user?: boolean;
    exclude_replies?: boolean;
    include_entities?: boolean;
}