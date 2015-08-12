/**
 * Created by khaled on 7/28/15.
 */


angular.module('post.services',[])
    .factory('postService',function(){


        return {
            list : [
                {
                    id:1,
                    title: 'Black box',
                    description:'some des description'
                },
                {
                    id:2,
                    title: 'XBOX 360',
                    description:'super new xbox 360'
                }
            ],
            getlist: function(){
                return this.list;
            },
            getOne: function (id) {
                return this.list[0];
            }
        };


    })
;