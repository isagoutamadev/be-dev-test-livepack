export interface Paging<T> {
    datas: Array<T>;
    paging: {
        totalData?: number;
        totalPage?: number;
        currentPage?: number;
        limit?: number;
    };
}

export class Pagination<T> {
    private datas: Array<T>;
    private total?: number;
    private page?: number;
    private limit?: number;

    constructor(datas: Array<T>, total?: number, page?: number, limit?: number) {
        this.datas = datas;
        this.total = total;
        this.page = page;
        this.limit = limit;
    }

    public getPaging = (): Paging<T> => {
        const paging: any = {};
        if (this.page) {
            paging.currentPage = this.page;
        }
        if (this.total) {
            paging.totalData = this.total;
        }
        if (this.total) {
            paging.totalData = this.total;
        }
        if (this.limit) {
            paging.limit = this.limit;
        }
        if (this.total && this.limit) {
            paging.totalPage = Math.ceil(this.total / this.limit);
        }
        return {
            paging,
            datas: this.datas,
        };
    };
}
