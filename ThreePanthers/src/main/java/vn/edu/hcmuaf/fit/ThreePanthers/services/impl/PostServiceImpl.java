package vn.edu.hcmuaf.fit.ThreePanthers.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PageResponse;
import vn.edu.hcmuaf.fit.ThreePanthers.commons.PostFilter;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostDetailResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.dtos.res.PostSummaryResponseDto;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.CategoryEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.entities.TagEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.exeptions.ResourceNotFoundException;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.PostRepository;
import vn.edu.hcmuaf.fit.ThreePanthers.services.PostService;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    @Override
    public PostDetailResponseDto getPostDetail(String slug) {
        PostEntity e = postRepository.findBySlug(slug);
        if (e == null)
            throw new ResourceNotFoundException("Không tìm thấy bài viết");
        PostDetailResponseDto res = new PostDetailResponseDto();

        res.setId(e.getId());
        res.setAuthor(e.getAuthor().getUsername());
        res.setContent(e.getContent());
        res.setIsFeatured(e.getIsFeatured());
        res.setPublishedAt(e.getPublishedAt());
        res.setSummary(e.getSummary());
        res.setTags(e.getTags());
        res.setThumbnail(e.getThumbnail());
        res.setTitle(e.getTitle());
        res.setViewCount(e.getViewCount());
        res.setCategory(e.getCategory());

        return res;
    }

    @Override
    public PageResponse<PostSummaryResponseDto> getPost(PostFilter filter) {
        int page = filter.getPageNo() > 0 ? filter.getPageNo() - 1 : 0;
        Pageable pageable = PageRequest.of(page, filter.getPageSize(), Sort.by("publishedAt").descending());

        Specification<PostEntity> spec = createSpecification(filter);

        Page<PostEntity> pageResult = postRepository.findAll(spec, pageable);

        List<PostSummaryResponseDto> items = pageResult.getContent().stream()
                .map(this::mapToSummaryDto)
                .collect(Collectors.toList());

        return PageResponse.<PostSummaryResponseDto>builder()
                .currentPage(filter.getPageNo())
                .totalPages(pageResult.getTotalPages())
                .totalElements(pageResult.getTotalElements())
                .items(items)
                .build();
    }

    private Specification<PostEntity> createSpecification(PostFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getCategoriesSlug() != null && !filter.getCategoriesSlug().isEmpty()) {
                Join<PostEntity, CategoryEntity> categoryJoin = root.join("category");
                predicates.add(categoryJoin.get("slug").in(filter.getCategoriesSlug()));
            }
            if (filter.getTagsSlug() != null && !filter.getTagsSlug().isEmpty()) {
                Join<PostEntity, TagEntity> tagJoin = root.join("tags");
                predicates.add(tagJoin.get("slug").in(filter.getTagsSlug()));
                query.distinct(true);
            }

            if (filter.getType() != null) {
                predicates.add(cb.equal(root.get("type"), filter.getType()));
            }

            if (filter.getIsFeatured() != null) {
                predicates.add(cb.equal(root.get("isFeatured"), filter.getIsFeatured()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private PostSummaryResponseDto mapToSummaryDto(PostEntity e) {
        PostSummaryResponseDto dto = new PostSummaryResponseDto();
        dto.setId(e.getId());
        dto.setTitle(e.getTitle());
        dto.setSummary(e.getSummary());
        dto.setThumbnail(e.getThumbnail());
        dto.setPublishedAt(e.getPublishedAt());
        dto.setViewCount(e.getViewCount());
        dto.setIsFeatured(e.getIsFeatured());

        if (e.getAuthor() != null) {
            dto.setAuthor(e.getAuthor().getUsername());
        }

        dto.setCategory(e.getCategory());
        dto.setTags(e.getTags());

        return dto;
    }

}
