import TwitterClient from 'twitter';
import { ITweet, ITweetFollowsList } from './interface/twitterapi.interface';
import { ITwitterApiFollowParams, ITwitterApiTimeLineParams } from './interface/params.interface';

export default class Twitter{
    private client: TwitterClient;

    constructor(args:  TwitterClient.AccessTokenOptions | TwitterClient.BearerTokenOptions){
        this.client = new TwitterClient(args);
    }

    public async callApiAsync<T = TwitterClient.RequestParams>(api: string, args?: any): Promise<T>{
        if(args){
            return new Promise((res, rej) => {
                this.client.get(api, args, function(err, data, response){
                    if(err){
                        rej(err);
                    }
                    else{
                        res(data as T);
                    }
                });
            });
        }
        else{
            return new Promise((res, rej) => {
                this.client.get(api, function(err, data, response){
                    if(err){
                        rej(err);
                    }
                    else{
                        res(data as T);
                    }
                });
            });
        }
    }

    public async getTimeline(params?: ITwitterApiTimeLineParams): Promise<Array<ITweet>>{
        return await this.callApiAsync<Array<ITweet>>('/statuses/home_timeline.json', params);
    }

    public async follow(screen_name: string, follow: boolean): Promise<any>{
        return await this.callApiAsync('friendships/create.json', {
            screen_name,
            follow
        });
    }

    //获取关注者
    public async getFollowersList(args?: ITwitterApiFollowParams): Promise<ITweetFollowsList>{
        return await this.callApiAsync<ITweetFollowsList>('followers/list.json', args);
    }

    //获取正在关注
    public async getFollowingList(args?: ITwitterApiFollowParams): Promise<ITweetFollowsList>{
        return await this.callApiAsync<ITweetFollowsList>('friends/list.json', args);
    }
}