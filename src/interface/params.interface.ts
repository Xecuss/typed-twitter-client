export interface ITwitterApiFollowParams{
    count?: number;
    user_id?: number;
    screen_name?: string;
    cursor?: number;
    skip_status?: boolean;
    include_user_entities?: boolean;
}

export interface ITwitterApiTimeLineParams{
    count?: number;
    since_id?: number;
    max_id?: number;
    trim_user?: boolean;
    exclude_replies?: boolean;
    include_entities?: boolean;
}